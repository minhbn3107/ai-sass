"use client";

import * as z from "zod";
import { ArrowUp, CircleStop } from "lucide-react";
import { useForm } from "react-hook-form";
import { conversationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Empty from "@/components/empty";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import { Content } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import useScrollToBottom from "@/components/hooks/use-scroll-to-bottom";
import CopyButton from "../copy-button";

export default function ConversationForm() {
    const router = useRouter();
    const [messages, setMessages] = useState<Content[]>([]);
    const bottomRef = useScrollToBottom(messages);

    const form = useForm<z.infer<typeof conversationSchema>>({
        resolver: zodResolver(conversationSchema),
        defaultValues: {
            prompt: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof conversationSchema>) => {
        try {
            const userMessage: Content = {
                role: "user",
                parts: [{ text: values.prompt }],
            };

            // Update the messages state with the new user message
            setMessages((current) => {
                const updatedMessages = [...current, userMessage];
                return updatedMessages;
            });

            const response = await fetch("/api/conversation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: values.prompt,
                    messages: [...messages, userMessage],
                }),
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let accumulatedResponse = "";

            // Initialize a placeholder for the model's response
            setMessages((current) => [
                ...current,
                {
                    role: "model",
                    parts: [{ text: "" }],
                },
            ]);

            while (!done) {
                const { value, done: doneReading } = await reader!.read();
                done = doneReading;
                const chunkValue = decoder.decode(value);
                accumulatedResponse += chunkValue;

                // Update the last message incrementally
                setMessages((current) => {
                    const updatedMessages = [...current];
                    const lastMessage =
                        updatedMessages[updatedMessages.length - 1];
                    lastMessage.parts[0].text = accumulatedResponse;
                    return updatedMessages;
                });
            }

            form.reset();
        } catch (error: any) {
            console.log(error);
        } finally {
            router.refresh();
        }
    };

    useEffect(() => {
        form.setFocus("prompt");
    }, [isLoading, form]);

    return (
        <div className="flex-1 flex flex-col px-4 lg:px-8 relative">
            <div className="flex-1 overflow-y-auto">
                {messages.length === 0 && !isLoading && (
                    <Empty label="No conversation started." />
                )}
                {messages.length > 0 && (
                    <div className="flex flex-col gap-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                                    message.role === "user"
                                        ? "bg-white border border-black/10"
                                        : "bg-muted"
                                )}
                            >
                                {message.role === "user" ? (
                                    <UserAvatar />
                                ) : (
                                    <BotAvatar />
                                )}
                                <div className="flex-grow">
                                    <ReactMarkdown
                                        components={{
                                            pre: ({ node, ...props }) => (
                                                <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                                    <pre {...props} />
                                                </div>
                                            ),
                                            code: ({ node, ...props }) => (
                                                <code
                                                    className="bg-black/10 rounded-lg p-1"
                                                    {...props}
                                                />
                                            ),
                                        }}
                                        className="text-sm overflow-hidden leading-7"
                                    >
                                        {message.parts?.[0]?.text}
                                    </ReactMarkdown>
                                </div>

                                <CopyButton
                                    text={message.parts?.[0]?.text || ""}
                                />
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>
                )}
            </div>
            <div className="sticky bottom-0 border-2 p-4 bg-white mt-auto rounded-lg">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex items-center gap-2"
                    >
                        <FormField
                            control={form.control}
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            {...field}
                                            className="border-0 outline-none focus:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="How do I calculate the radius of a circle?"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="w-auto" disabled={isLoading}>
                            {isLoading ? <CircleStop /> : <ArrowUp />}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
