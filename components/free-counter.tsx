"use client";

import { useEffect, useState } from "react";

export default function FreeCounter({
    creditBalance,
}: {
    creditBalance?: number;
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return <div>FreeCounter</div>;
}
