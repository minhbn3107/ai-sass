"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { plans } from "@/constants";
import Link from "next/link";

export default function FreeCounter({
    creditBalance,
    creditAmount,
    planId,
}: {
    creditBalance: number;
    creditAmount: number;
    planId: number;
}) {
    const [mounted, setMounted] = useState(false);
    const plan = plans.find((plan) => plan._id === planId);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !creditBalance || !creditAmount || !plan) return null;

    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>
                            {creditBalance} / {creditAmount} {plan?.name}
                        </p>
                        <Progress
                            className="h-3"
                            value={(creditBalance / creditAmount) * 100}
                        />
                    </div>
                    <Link href="/credits">
                        <Button className="w-full" variant="premium">
                            Upgrade
                            <Zap className="w-4 h-4 ml-2 fill-white" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
