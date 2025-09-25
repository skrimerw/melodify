"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchTabs from "./SearchTabs";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface Props {
  className?: string;
}

export default function Search({ className }: Props) {
  const searchParams = useSearchParams();
  const text = searchParams.get("text");
  const [searchVal, setSearchVal] = useState(text || "");
  const t = useTranslations("Search")

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="relative">
        <Input
          name="text"
          placeholder={t("inputPlaceholder")}
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="peer pl-9.5 rounded-full"
        />
        <SearchIcon
          className={cn(
            "absolute top-1/2 -translate-y-1/2 left-2 text-typography-gray transition-colors peer-focus-visible:text-primary"
          )}
        />
      </div>
      <div className="mt-5 h-full">
        <SearchTabs searchVal={searchVal} />
      </div>
    </div>
  );
}
