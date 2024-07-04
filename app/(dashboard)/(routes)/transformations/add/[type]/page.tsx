import Heading from "@/components/header";
import { redirect } from "next/navigation";
import { transformationTypes } from "@/constants";
import TransformationForm from "@/components/transformation-form";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";

export default async function AddTransformationTypePage({
    params: { type },
}: SearchParamProps) {
    const { userId } = auth();
    const transformation = transformationTypes[type];

    if (!userId) redirect("/sign-in");

    const user = await getUserById(userId);

    return (
        <div>
            <Heading
                title={transformation.title}
                description={transformation.subTitle}
                icon={transformation.icon}
                iconColor={transformation.color}
                bgColor={transformation.bgColor}
            />
            <div className="px-4 lg:px-8">
                <TransformationForm
                    action="Add"
                    userId={user._id}
                    type={transformation.type as TransformationTypeKey}
                    creditBalance={user.creditBalance}
                />
            </div>
        </div>
    );
}
