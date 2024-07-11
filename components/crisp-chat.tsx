"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("47b0d1b6-2068-4782-ad30-2b2e217cc92c");
    }, []);

    return null;
};
