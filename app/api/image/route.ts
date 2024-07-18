import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const limeWireKey = process.env.LIMEWIRE_API;

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, samples = 1, aspect_ratio = "1:1" } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!limeWireKey) {
            return new NextResponse("OpenAI API Key not found", {
                status: 500,
            });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        if (!samples) {
            return new NextResponse("Samples is required", { status: 400 });
        }

        if (!aspect_ratio) {
            return new NextResponse("Aspect Ratio is required", {
                status: 400,
            });
        }

        const response = await fetch(
            `https://api.limewire.com/api/image/generation`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Api-Version": "v1",
                    Accept: "application/json",
                    Authorization: `Bearer ${limeWireKey}`,
                },
                body: JSON.stringify({
                    prompt: prompt,
                    samples: parseInt(samples),
                    aspect_ratio: aspect_ratio,
                }),
            }
        );

        const responseData = await response.json();
        console.log(responseData);

        return NextResponse.json(responseData);
    } catch (error) {
        console.log("[IMAGE ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 5000 });
    }
}
