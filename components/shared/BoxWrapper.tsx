"use client";

import { cn } from "@/lib/utils";
import React, { CSSProperties } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

interface Props {
    id?: string;
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;
}

export default function BoxWrapper({ id, children, className, style }: Props) {
    return (
        <OverlayScrollbarsComponent
            id={id}
            className={cn(
                "relative bg-card rounded-lg px-6 py-4 box-wrapper-scrollbar border border-typography-gray/5",
                className
            )}
            options={{ scrollbars: { autoHide: "scroll" } }}
            style={style}
        >
            {children}
        </OverlayScrollbarsComponent>
    );
}
