"use client";

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
        <MobileSidebar
            creditBalance={creditBalance}
            creditAmount={creditAmount}
            planId={planId}
        />
    );
}
