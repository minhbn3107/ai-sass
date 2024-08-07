import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { plans } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import Checkout from "@/components/check-out";
import { Check, Map, X } from "lucide-react";
import { routes } from "../dashboard/page";

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

            <section className="px-4 lg:px-8 pb-12 md:px-20 space-y-4">
                <ul className="credits-list">
                    {plans.map((plan, index) => (
                        <li key={plan.name} className="credits-item relative">
                            {user.planId === plan._id && (
                                <div className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                    Current Plan
                                </div>
                            )}
                            <div className="flex-center flex-col gap-3">
                                <Map width={50} height={50} />
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

                            <ul className="flex flex-col gap-5 py-9">
                                {plan.inclusions.map((inclusion) => (
                                    <li
                                        key={plan.name + inclusion.label}
                                        className="flex items-center gap-4"
                                    >
                                        {inclusion.isIncluded ? (
                                            <Check color="green" />
                                        ) : (
                                            <X color="red" />
                                        )}
                                        <p className="p-16-regular">
                                            {inclusion.label}
                                        </p>
                                    </li>
                                ))}
                            </ul>

                            {index === 0 ? (
                                <Button
                                    variant="outline"
                                    className="credits-btn"
                                >
                                    Free Consumable
                                </Button>
                            ) : (
                                <Checkout
                                    planId={plan._id}
                                    planName={plan.name}
                                    amount={plan.price}
                                    credits={plan.credits}
                                    buyerId={user._id}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
};

export default Credits;
