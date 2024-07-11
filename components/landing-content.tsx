"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
    {
        name: "Antonio",
        avatar: "A",
        title: "Software Engineer",
        description: "This is the best application I used!",
    },
    {
        name: "Brianna",
        avatar: "B",
        title: "Product Manager",
        description:
            "This app has significantly improved my team's productivity.",
    },
    {
        name: "Carlos",
        avatar: "C",
        title: "UX Designer",
        description: "The user interface is intuitive and easy to navigate.",
    },
    {
        name: "Diana",
        avatar: "D",
        title: "Data Analyst",
        description: "The insights from this application have been invaluable.",
    },
    {
        name: "Ethan",
        avatar: "E",
        title: "Project Coordinator",
        description:
            "Managing projects has never been easier, thanks to this app.",
    },
    {
        name: "Fiona",
        avatar: "F",
        title: "Marketing Specialist",
        description: "This app helps us target our campaigns more effectively.",
    },
];

export default function LandingContent() {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((item) => (
                    <Card
                        key={item.description}
                        className="bg-[#192339] border-none text-white"
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">
                                        {item.title}
                                    </p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}
