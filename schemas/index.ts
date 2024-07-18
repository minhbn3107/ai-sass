import * as z from "zod";

export const conversationSchema = z.object({
    prompt: z.string().min(1, { message: "Prompt is required" }),
});

export const imageSchema = z.object({
    prompt: z
        .string()
        .min(1, { message: "Image prompt is required" })
        .max(2000, { message: "Image prompt must not exceed 2000 characters" }),
    samples: z.string().min(1),
    aspect_ratio: z.string().min(1),
});

export const musicSchema = z.object({
    prompt: z.string().min(1, { message: "Music prompt is required" }),
});

export const videoSchema = z.object({
    prompt: z.string().min(1, { message: "Video prompt is required" }),
});

export const transformationSchema = z.object({
    title: z.string(),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string(),
});
