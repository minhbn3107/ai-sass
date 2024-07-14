import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!genAI.apiKey) {
            return new NextResponse("Gemini API Key not found", {
                status: 500,
            });
        }

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
        });

        const chat = model.startChat({
            generationConfig: {
                maxOutputTokens: 500,
            },
            history: [...messages],
        });

        const result = await chat.sendMessageStream(prompt);

        // Create a ReadableStream to stream the response
        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of result.stream) {
                    const chunkText = chunk.text();
                    // console.log(chunkText);
                    controller.enqueue(chunkText);
                }
                controller.close();
            },
        });

        // Return the stream as the response
        return new NextResponse(stream, {
            headers: {
                "Content-Type": "text/plain",
                "Transfer-Encoding": "chunked",
            },
        });
    } catch (error) {
        console.log("[CODE ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
