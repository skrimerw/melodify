"use client";

import React, { useEffect } from "react";

export default function AverageBgColorSetter({ color }: { color: string }) {
    useEffect(() => {
        document.body.style.setProperty("--average-background-color", color);
    }, []);

    return <></>;
}
