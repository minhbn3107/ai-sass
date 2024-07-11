"use client";

import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "@/components/mobile-sidebar";

export default function Navbar({
    creditBalance,
    creditAmount,
    planId,
}: {
    creditBalance: number;
    creditAmount: number;
    planId: number;
}) {
    return (
        <div className="flex items-center p-4">
            <MobileSidebar
                creditBalance={creditBalance}
                creditAmount={creditAmount}
                planId={planId}
            />
            <div className="flex w-full justify-end">
                <UserButton />
            </div>
        </div>
    );
}
