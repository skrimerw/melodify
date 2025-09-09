import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React, { useId, useState } from "react";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    label?: string;
    name: string;
    className?: string;
}

export default function FormInput({
    label,
    name,
    placeholder,
    className,
    ...props
}: Props) {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const [typeToggle, setTypeToggle] = useState(props.type);

    const errorMsg = errors[name]?.message as string;
    const uniqueId = String(useId());
    const initialType = props.type;

    return (
        <div className={cn("relative flex flex-col gap-1.5", className)}>
            <Label htmlFor={uniqueId} className="text-base w-fit">
                {label}
            </Label>
            <Input
                id={uniqueId}
                placeholder={placeholder}
                className={cn(
                    "text-base",
                    errorMsg && "border-red-500 focus-visible:border-red-500",
                    initialType === "password" && "pr-9"
                )}
                {...register(name)}
                {...props}
                type={typeToggle}
            />
            {initialType === "password" && !props.disabled && (
                <motion.button
                    whileHover={{
                        scale: 1.08,
                    }}
                    whileTap={{
                        scale: 1,
                    }}
                    type="button"
                    className="absolute cursor-pointer right-0 top-[34px] text-typography-gray p-2"
                    onClick={() =>
                        setTypeToggle((prev) =>
                            prev === "password" ? "text" : "password"
                        )
                    }
                >
                    {typeToggle === "password" ? (
                        <Eye size={20} />
                    ) : (
                        <EyeOff size={20} />
                    )}
                </motion.button>
            )}
            <span className="text-red-400 text-sm">{errorMsg}</span>
        </div>
    );
}
