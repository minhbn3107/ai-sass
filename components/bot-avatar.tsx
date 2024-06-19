import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export default function BotAvatar() {
    const { user } = useUser();

    return (
        <Avatar className="h-8 w-8">
            <AvatarImage src="/logo.png" className="p-1" />
        </Avatar>
    );
}
