import { cn } from "@/lib/utils";
import React, { CSSProperties } from "react";

interface Props {
    id?: string;
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;
}

export default function BoxWrapper({ id, children, className, style }: Props) {
    return (
        <div
            id={id}
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
