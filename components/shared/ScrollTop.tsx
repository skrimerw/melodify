"use client";

import React, { useEffect } from "react";

export default function ScrollTop() {
    useEffect(() => {
        document
            .querySelector(
                ".main-container>div[data-overlayscrollbars-contents]"
            )
            ?.scrollTo(0, 0);
    }, []);
    return <></>;
}
