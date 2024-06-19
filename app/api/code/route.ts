import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

const instructionMessage: ChatCompletionMessageParam = {
    role: "system",
    content:
        "You are a code generator. You need to answer in markdown code snippets. May be using code comments for explainations if needed.",
};

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API Key not found", {
                status: 500,
            });
        }

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages],
        });

        return NextResponse.json(response.choices[0].message.content);
    } catch (error) {
        console.log("[CODE ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 5000 });
    }
}
