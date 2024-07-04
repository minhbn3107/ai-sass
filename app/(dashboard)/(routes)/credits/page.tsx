import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import Heading from "@/components/header";
import { Button } from "@/components/ui/button";
import { plans, routes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import Checkout from "@/components/check-out";

const Credits = async () => {
    const { userId } = auth();
    const buyCreditsRoute = routes.find(
        (route) => route.label === "Buy Credits"
    );

    if (!userId) redirect("/sign-in");

    const user = await getUserById(userId);

    return (
        <>
            <Heading
                title="Buy Credits"
                description="Choose a credit package that suits your needs!"
                icon={buyCreditsRoute?.icon}
                iconColor={buyCreditsRoute?.color}
                bgColor={buyCreditsRoute?.bgColor}
            />

            <section className="px-4 lg:px-8">
                <ul className="credits-list">
                    {plans.map((plan) => (
                        <li key={plan.name} className="credits-item">
                            <div className="flex-center flex-col gap-3">
                                <Image
                                    src={plan.icon}
                                    alt="check"
                                    width={50}
                                    height={50}
                                />
                                <p className="p-20-semibold mt-2 text-purple-500">
                                    {plan.name}
                                </p>
                                <p className="h1-semibold text-dark-600">
                                    ${plan.price}
                                </p>
                                <p className="p-16-regular">
                                    {plan.credits} Credits
                                </p>
                            </div>

                            {/* Inclusions */}
                            <ul className="flex flex-col gap-5 py-9">
                                {plan.inclusions.map((inclusion) => (
                                    <li
                                        key={plan.name + inclusion.label}
                                        className="flex items-center gap-4"
                                    >
                                        <Image
                                            src={`/assets/icons/${
                                                inclusion.isIncluded
                                                    ? "check.svg"
                                                    : "cross.svg"
                                            }`}
                                            alt="check"
                                            width={24}
                                            height={24}
                                        />
                                        <p className="p-16-regular">
                                            {inclusion.label}
                                        </p>
                                    </li>
                                ))}
                            </ul>

                            {plan.name === "Free" ? (
                                <Button
                                    variant="outline"
                                    className="credits-btn"
                                >
                                    Free Consumable
                                </Button>
                            ) : (
                                <SignedIn>
                                    <Checkout
                                        plan={plan.name}
                                        amount={plan.price}
                                        credits={plan.credits}
                                        buyerId={user._id}
                                    />
                                </SignedIn>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
};

export default Credits;
