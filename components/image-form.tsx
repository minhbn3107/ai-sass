"use client";

import * as z from "zod";
import axios from "axios";
import { Download } from "lucide-react";
import { useForm } from "react-hook-form";
import { imageSchema } from "@/schemas";
import { samplesOptions, creditFee, lmAspectRatioOptions } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { InsufficientCreditsModal } from "./insufficient-credits-modal";
import { useToast } from "./ui/use-toast";
import { updateCredits } from "@/lib/actions/user.actions";

export default function ImageForm({
    creditBalance,
    userId,
}: {
    creditBalance: number;
    userId: string;
}) {
    const router = useRouter();
    const { toast } = useToast();
    const [images, setImages] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof imageSchema>>({
        resolver: zodResolver(imageSchema),
        defaultValues: {
            prompt: "",
            samples: "1",
            aspect_ratio: "1:1",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof imageSchema>) => {
        try {
            setImages([]);

            const response = await axios.post("/api/image", values);

            startTransition(async () => {
                await updateCredits(userId, -parseInt(values.samples));
            });

            console.log(response.data);

            const urls = response.data.data.map(
                (image: any) => image.asset_url
            );
            console.log(urls);

            setImages(urls);

            form.reset();
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
                            <FormItem className="col-span-12 lg:col-span-6">
                                <FormControl className="m-0 p-0">
                                    <Input
                                        {...field}
                                        className="border-0 outline-none focus-within:ring-0 focus-visible:ring-transparent"
                                        disabled={isLoading}
                                        placeholder="A picture of a horse in Swiss alps"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="samples"
                        render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-2">
                                <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                defaultValue={field.value}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {samplesOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="aspect_ratio"
                        render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-2">
                                <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                defaultValue={field.value}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {lmAspectRatioOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <Button
                        className="col-span-12 lg:col-span-2 w-full"
                        disabled={isLoading && isPending}
                    >
                        Generate
                    </Button>
                </form>
            </Form>
            <div className="space-y-4 mt-4">
                {isLoading && (
                    <div className="p-20">
                        <Loader waitingTime="10 seconds" />
                    </div>
                )}
                {images.length === 0 && !isLoading && (
                    <Empty label="No image generated." />
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                    {images.map((src) => (
                        <Card key={src} className="rounded-lg overflow-hidden">
                            <div className="relative aspect-square">
                                <Image alt="Image" fill src={src} />
                            </div>
                            <CardFooter className="p-2">
                                <Button
                                    onClick={() => window.open(src)}
                                    variant="secondary"
                                    className="w-full"
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
