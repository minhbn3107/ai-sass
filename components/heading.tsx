import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

interface HeadingProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    iconColor?: string;
    bgColor?: string;
}

export default function Heading({
    title,
    description,
    icon: Icon,
    iconColor,
    bgColor,
}: HeadingProps) {
    return (
        <div className="flex justify-between items-center mb-8 mt-4 p-4">
            <div className="px-2 lg:px-4 flex items-center gap-x-3">
                {Icon && (
                    <div className={cn("p-2 w-fit rounded-md", bgColor)}>
                        <Icon className={cn("w-10 h-10", iconColor)} />
                    </div>
                )}
                <div>
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>
            </div>
            <div className="w-8 h-8 mr-4">
                <UserButton
                    appearance={{
                        elements: {
                            userButtonAvatarBox: "w-8 h-8",
                        },
                    }}
                />
            </div>
        </div>
    );
}
