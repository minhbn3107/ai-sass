"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { musicSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { InsufficientCreditsModal } from "./insufficient-credits-modal";
import { creditFee } from "@/constants";

export default function MusicForm({
    creditBalance,
}: {
    creditBalance: number;
}) {
    const router = useRouter();
    const [music, setMusic] = useState<string>();

    const form = useForm<z.infer<typeof musicSchema>>({
        resolver: zodResolver(musicSchema),
        defaultValues: {
            prompt: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof musicSchema>) => {
        try {
            setMusic(undefined);

            const response = await axios.post("/api/music", values);

            setMusic(response.data.audio);

            form.reset();
        } catch (error: any) {
            console.log(error);
        } finally {
            router.refresh();
        }
    };

    return (
        <div className="px-4 lg:px-8">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                >
                    {creditBalance < Math.abs(creditFee) && (
                        <InsufficientCreditsModal />
                    )}
                    <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-10">
                                <FormControl className="m-0 p-0">
                                    <Input
                                        {...field}
                                        className="border-0 outline-none focus-within:ring-0 focus-visible:ring-transparent"
                                        disabled={isLoading}
                                        placeholder="Piano solo"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        className="col-span-12 lg:col-span-2 w-full"
                        disabled={isLoading}
                    >
                        Generate
                    </Button>
                </form>
            </Form>
            <div className="space-y-4 mt-4">
                {isLoading && (
                    <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                        <Loader waitingTime="9 seconds" />
                    </div>
                )}
                {!music && !isLoading && <Empty label="No music generated." />}
                {music && (
                    <>
                        <audio controls className="w-full mt-8">
                            <source src={music} />
                        </audio>
                    </>
                )}
            </div>
        </div>
    );
}
