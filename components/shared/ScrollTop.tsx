"use client";

import React, { useEffect } from "react";

export default function ScrollTop() {
    useEffect(() => {
        document.querySelector(".main-container")?.scrollTo(0, 0);
    }, []);
    return <></>;
}
