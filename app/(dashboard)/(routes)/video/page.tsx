import Heading from "@/components/header";
import { Video } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";
import VideoForm from "@/components/video-form";

export default async function VideoPage() {
    const { userId } = auth();

    if (!userId) redirect("/sign-in");

    const user = await getUserById(userId);

    return (
        <div>
            <Heading
                title="Video Generation"
                description="Turn your prompt into video."
                icon={Video}
                iconColor="text-orange-300"
                bgColor="bg-orange-300/10"
            />
            <VideoForm creditBalance={user.creditBalance} />
        </div>
    );
}
