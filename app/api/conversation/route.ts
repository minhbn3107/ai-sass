import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

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
            history: messages.slice(0, -1).map((msg: any) => ({
                role: msg.role,
                parts: [{ text: msg.content }],
            })),
        });

        const latestMessage = messages[messages.length - 1];
        const parts: any[] = [{ text: latestMessage.content }];

        // Add images to the parts array if present
        if (latestMessage.images) {
            latestMessage.images.forEach((image: any) => {
                parts.push({
                    inlineData: {
                        mimeType: image.type,
                        data: image.data.split(",")[1], // Remove the "data:image/jpeg;base64," part
                    },
                });
            });
        }

        const result = await chat.sendMessageStream(parts);

        // Create a ReadableStream to stream the response
        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of result.stream) {
                    const chunkText = chunk.text();
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
    } catch (error: any) {
        console.log("[CODE ERROR]", error);

        if (error.statusText === "Too Many Requests" && error.status === 429) {
            return new NextResponse(
                JSON.stringify({
                    error: "Too many requests. Please try again later.",
                    details: "The API quota has been exceeded.",
                }),
                {
                    status: 429,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
