"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

function Slider({
    className,
    defaultValue,
    value,
    min = 0,
    max = 100,
    ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
    const _values = React.useMemo(
        () =>
            Array.isArray(value)
                ? value
                : Array.isArray(defaultValue)
                ? defaultValue
                : [min, max],
        [value, defaultValue, min, max]
    );

    return (
        <SliderPrimitive.Root
            data-slot="slider"
            defaultValue={defaultValue}
            value={value}
            min={min}
            max={max}
            className={cn(
                "group cursor-pointer relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
                
                props.orientation === "vertical" ? "p-1" : "py-1"
                ,className
            )}
            {...props}
        >
            <SliderPrimitive.Track
                data-slot="slider-track"
                className={cn(
                    "bg-muted relative grow rounded-full data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
                )}
            >
                <SliderPrimitive.Range
                    data-slot="slider-range"
                    className={cn(
                        "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full rounded-full overflow-visible"
                    )}
                >
                    <span
                        className={cn(
                            "opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible absolute inline-block h-3 w-3 rounded-full ml-auto z-10 bg-white",
                            props.orientation === "vertical"
                                ? "-right-[50%] -top-1.5"
                                : "-top-[100%] -right-1.5"
                        )}
                    ></span>
                </SliderPrimitive.Range>
            </SliderPrimitive.Track>
            {/*  {Array.from({ length: _values.length }, (_, index) => (
                <SliderPrimitive.Thumb
                    data-slot="slider-thumb"
                    key={index}
                    className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
                />
            ))} */}
        </SliderPrimitive.Root>
    );
}

export { Slider };
