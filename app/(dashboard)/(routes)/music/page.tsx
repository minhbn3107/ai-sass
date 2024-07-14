import { Music } from "lucide-react";
import Heading from "@/components/heading";
import MusicForm from "@/components/music-form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";

export default async function MusicPage() {
    const { userId } = auth();

    if (!userId) redirect("/sign-in");

    const user = await getUserById(userId);

    return (
        <div>
            <Heading
                title="Music Generation"
                description="Turn your prompt into music."
                icon={Music}
                iconColor="text-emerald-500"
                bgColor="bg-emerald-500/10"
            />
            <MusicForm creditBalance={user.creditBalance} />
        </div>
    );
}
