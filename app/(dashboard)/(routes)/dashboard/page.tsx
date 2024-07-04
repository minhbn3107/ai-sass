import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { routes } from "@/constants";
import { getAllImages } from "@/lib/actions/image.actions";
import Link from "next/link";
import { Collection } from "@/components/collection";

export default async function DashboardPage({
    searchParams,
}: SearchParamProps) {
    const page = Number(searchParams.page) || 1;
    const searchQuery = (searchParams?.query as string) || "";
    const images = await getAllImages({ page, searchQuery });

    return (
        <div>
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center">
                    Explore the power of AI
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                    🌟 Unleash the power of AI with your creativity 🌟
                </p>
            </div>
            <div className="px-4 md:px-20 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {routes.slice(1, -3).map((route) => (
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
