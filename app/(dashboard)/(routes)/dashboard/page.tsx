import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { getAllImages } from "@/lib/actions/image.actions";
import Link from "next/link";
import { Collection } from "@/components/collection";
import {
    ImageIcon,
    LayoutDashboard,
    MessageSquare,
    Music,
    VideoIcon,
    ImageOff,
    Sparkles,
    StarOff,
    Palette,
    ImageMinus,
    User,
    CreditCard,
} from "lucide-react";

export const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-500",
        bgColor: "bg-pink-500/10",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-300",
        bgColor: "bg-orange-300/10",
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
    },
    {
        label: "Image Restore",
        icon: ImageOff,
        href: "/transformations/add/restore",
        color: "text-red-700",
        bgColor: "bg-red-700/10",
    },
    {
        label: "Generative Fill",
        icon: Sparkles,
        href: "/transformations/add/fill",
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10",
    },
    {
        label: "Object Remove",
        icon: StarOff,
        href: "/transformations/add/remove",
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
    },
    {
        label: "Object Recolor",
        icon: Palette,
        href: "/transformations/add/recolor",
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
    },
    {
        label: "Background Remove",
        icon: ImageMinus,
        href: "/transformations/add/removeBackground",
        color: "text-teal-500",
        bgColor: "bg-teal-500/10",
    },
    {
        label: "Profile",
        icon: User,
        href: "/profile",
        color: "text-indigo-300",
        bgColor: "bg-indigo-300/10",
    },
    {
        label: "Buy Credits",
        icon: CreditCard,
        href: "/credits",
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
    },
];

export default async function DashboardPage({
    searchParams,
}: SearchParamProps) {
    const page = Number(searchParams.page) || 1;
    const searchQuery = (searchParams?.query as string) || "";
    const images = await getAllImages({ page, searchQuery });

    return (
        <div>
            <div className="m-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center">
                    Explore the power of AI
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                    🌟 Unleash the power of AI with your creativity 🌟
                </p>
            </div>
            <div className="px-4 md:px-20 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {routes.slice(1, -2).map((route) => (
                        <Link key={route.label} href={route.href}>
                            <Card
                                key={route.href}
                                className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                            >
                                <div className="flex items-center gap-x-4">
                                    <div
                                        className={cn(
                                            "p-2 w-fit rounded-md",
                                            route.bgColor
                                        )}
                                    >
                                        <route.icon
                                            className={cn(
                                                "w-8 h-8",
                                                route.color
                                            )}
                                        />
                                    </div>
                                    <div className="font-semibold">
                                        {route.label}
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5" />
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
            <section className="px-4 py-12 md:px-20 space-y-4">
                <Collection
                    hasSearch={true}
                    images={images?.data}
                    totalPages={images?.totalPage}
                    page={page}
                />
            </section>
        </div>
    );
}
