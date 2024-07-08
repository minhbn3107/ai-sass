import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Genius - A.I Sass Tool",
    description: "🌟 Unleash the power of AI with your creativity 🌟",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ClerkProvider>
                    {children}
                    <Toaster />
                </ClerkProvider>
            </body>
        </html>
    );
}
