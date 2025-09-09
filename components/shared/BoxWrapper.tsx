import { cn } from "@/lib/utils";
import React, { CSSProperties } from "react";

interface Props {
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;
}

export default function BoxWrapper({ children, className, style }: Props) {
    return (
        <div
            className={cn(
                "bg-card rounded-lg px-6 py-4 box-wrapper-scrollbar border border-typography-gray/5",
                className
            )}
            style={style}
        >
            {children}
        </div>
    );
}
