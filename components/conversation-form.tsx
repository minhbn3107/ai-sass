"use client";

import * as z from "zod";
import { ArrowUp, CircleStop, ImagePlus, X, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { conversationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, DragEvent } from "react";
import Empty from "@/components/empty";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import ReactMarkdown from "react-markdown";
import useScrollToBottom from "@/components/hooks/use-scroll-to-bottom";
import CopyButton from "./copy-button";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type ImageData = {
    data: string;
    type: string;
};

type Message = {
    role: "user" | "model";
    content: string;
    images?: ImageData[];
};

export default function ConversationForm() {
    const router = useRouter();
    const { toast } = useToast();
    const [messages, setMessages] = useState<Message[]>([]);
    const [images, setImages] = useState<ImageData[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [dragCounter, setDragCounter] = useState(0);
    const bottomRef = useScrollToBottom(messages);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof conversationSchema>>({
        resolver: zodResolver(conversationSchema),
        defaultValues: {
            prompt: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof conversationSchema>) => {
        try {
            const userMessage: Message = {
                role: "user",
                content: values.prompt,
                images: images,
            };

            setMessages((current) => [...current, userMessage]);

            const response = await fetch("/api/conversation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || response.statusText);
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let accumulatedResponse = "";

            setMessages((current) => [
                ...current,
                {
                    role: "model",
                    content: "",
                },
            ]);

            while (!done) {
                const { value, done: doneReading } = await reader!.read();
                done = doneReading;
                const chunkValue = decoder.decode(value);
                accumulatedResponse += chunkValue;

                setMessages((current) => {
                    const updatedMessages = [...current];
                    const lastMessage =
                        updatedMessages[updatedMessages.length - 1];
                    lastMessage.content = accumulatedResponse;
                    return updatedMessages;
                });
            }

            form.reset();
            setImages([]);
        } catch (error: any) {
            console.error("Error in conversation:", error);

            toast({
                title: "Something went wrong!",
                description:
                    "An error occurred. Please try again in a few seconds.",
                duration: 5000,
                className: "error-toast",
            });
        } finally {
            router.refresh();
        }
    };

    const processFiles = (files: FileList | File[]) => {
        Array.from(files).forEach((file) => {
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImages((current) => [
                        ...current,
                        {
                            data: reader.result as string,
                            type: file.type,
                        },
                    ]);
                };
                reader.readAsDataURL(file);
            }
        });
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            processFiles(files);
        }
    };

    const handlePaste = (event: React.ClipboardEvent) => {
        const items = event.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.indexOf("image") !== -1) {
                const blob = item.getAsFile();
                if (blob) {
                    processFiles([blob]);
                }
            }
        }
    };

    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter((prev) => prev + 1);
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter((prev) => prev - 1);
        if (dragCounter === 1) {
            setIsDragging(false);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        setDragCounter(0);
        const files = e.dataTransfer.files;
        processFiles(files);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        setDragCounter(0);
    };

    const removeImage = (index: number) => {
        setImages((current) => current.filter((_, i) => i !== index));
    };

    useEffect(() => {
        form.setFocus("prompt");
    }, [isLoading, form]);

    return (
        <div
            className="flex-1 flex flex-col px-4 lg:px-8 relative"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onMouseLeave={handleMouseLeave}
        >
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
                                            code({
                                                node,
                                                className,
                                                children,
                                                ...props
                                            }) {
                                                const match =
                                                    /language-(\w+)/.exec(
                                                        className || ""
                                                    );
                                                const codeString = String(
                                                    children
                                                ).replace(/\n$/, "");
                                                return match ? (
                                                    // @ts-ignore: Unreachable code error
                                                    <div className="relative">
                                                        <SyntaxHighlighter
                                                            // @ts-ignore: Type error for 'style' prop
                                                            style={oneDark}
                                                            language={match[1]}
                                                            PreTag="div"
                                                            {...props}
                                                        >
                                                            {String(
                                                                children
                                                            ).replace(
                                                                /\n$/,
                                                                ""
                                                            )}
                                                        </SyntaxHighlighter>
                                                        <div className="absolute -top-6 left-0 opacity-100">
                                                            <span className="text-gray-400 text-xs ">
                                                                {match[1]}
                                                            </span>
                                                        </div>
                                                        <div className="absolute top-0 right-0 opacity-100 transition-opacity duration-200 text-white">
                                                            <CopyButton
                                                                text={
                                                                    codeString
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <code
                                                        className={className}
                                                        {...props}
                                                    >
                                                        {children}
                                                    </code>
                                                );
                                            },
                                            pre({ node, children, ...props }) {
                                                return (
                                                    <pre
                                                        className="overflow-auto w-full my-2 bg-gray-800 p-4 rounded-lg relative"
                                                        {...props}
                                                    >
                                                        {children}
                                                    </pre>
                                                );
                                            },
                                        }}
                                        className="text-sm overflow-hidden leading-7"
                                    >
                                        {message.content}
                                    </ReactMarkdown>
                                    {message.images &&
                                        message.images.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {message.images.map(
                                                    (image, imgIndex) => (
                                                        <Image
                                                            width={80}
                                                            height={80}
                                                            key={imgIndex}
                                                            src={image.data}
                                                            alt={`Uploaded ${imgIndex}`}
                                                            className="object-cover rounded"
                                                        />
                                                    )
                                                )}
                                            </div>
                                        )}
                                </div>
                                <CopyButton text={message.content} />
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
                        className="flex flex-col gap-2"
                    >
                        <div className="flex items-center gap-2">
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
                                                onPaste={handlePaste}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="hidden"
                                ref={fileInputRef}
                            />
                            <Button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isLoading}
                            >
                                <ImagePlus className="h-4 w-4" />
                            </Button>
                            <Button className="w-auto" disabled={isLoading}>
                                {isLoading ? <CircleStop /> : <ArrowUp />}
                            </Button>
                        </div>
                        {images.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {images.map((image, index) => (
                                    <div key={index} className="relative">
                                        <Image
                                            width={80}
                                            height={80}
                                            src={image.data}
                                            alt={`Uploaded ${index}`}
                                            className="object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </form>
                </Form>
            </div>

            {isDragging && (
                <div
                    className={cn(
                        "absolute inset-0 bg-blue-50 bg-opacity-90 flex items-center justify-center transition-opacity duration-300",
                        isDragging
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                    )}
                >
                    <div className="p-8 rounded-lg bg-white shadow-lg text-center">
                        <Upload className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                        <p className="text-lg font-semibold text-gray-700">
                            Drop your images here
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
