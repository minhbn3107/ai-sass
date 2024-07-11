"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";

export default function MobileSidebar({
    creditBalance,
    creditAmount,
    planId,
}: {
    creditBalance: number;
    creditAmount: number;
    planId: number;
}) {
    const [isMounted, setisMounted] = useState(false);

    useEffect(() => {
        setisMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar
                    creditBalance={creditBalance}
                    creditAmount={creditAmount}
                    planId={planId}
                />
            </SheetContent>
        </Sheet>
    );
}
