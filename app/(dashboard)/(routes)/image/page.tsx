import Heading from "@/components/heading";
import ImageForm from "@/components/image-form";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { ImageIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ImagePage() {
    const { userId } = auth();

    if (!userId) redirect("/sign-in");

    const user = await getUserById(userId);

    return (
        <div>
            <Heading
                title="Image Generation"
                description="Turn your prompt into image."
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
            />
            <ImageForm creditBalance={user.creditBalance} />
        </div>
    );
}
