import { useEffect, useRef } from "react";

export default function useScrollToBottom(dependency: any) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [dependency]);

    return bottomRef;
}
