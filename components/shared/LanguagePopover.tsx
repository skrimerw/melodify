"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { PopoverClose } from "@radix-ui/react-popover";

const languages = {
  en: {
    flagUrl: "/assets/flags/uk.webp",
    name: "English",
    enName: "English",
  },
  ru: {
    flagUrl: "/assets/flags/ru.webp",
    name: "Русский",
    enName: "Russian",
  },
};

type Locale = keyof typeof languages;

export default function LanguagePopover() {
  const lang = useLocale() as Locale;

  const handleLangChange = (locale: Locale) => {
    //@ts-ignore
    window.cookieStore.set({
      name: "lang",
      value: locale,
      // cookie expires in 100 years
      expires: Date.now() + 1000 * 60 * 60 * 24 * 365 * 100,
    });
    window.location.reload();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          asChild
          variant={"outline"}
          className="mt-auto w-fit h-8.5 text-sm font-semibold data-[state='open']:!border-primary !bg-card"
        >
          <div>
            <Globe />
            {languages[lang].name}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="top"
        sideOffset={10}
        className="w-40 p-1"
      >
        {(Object.keys(languages) as Locale[]).map((locale, i) => {
          return (
            <PopoverClose
              key={i}
              onClick={() => handleLangChange(locale)}
              className="flex items-center gap-2 text-sm p-1 hover:bg-accent rounded-sm cursor-pointer w-full"
            >
              <img src={languages[locale].flagUrl} className="w-6" />
              <div className="flex flex-col">
                <span>{languages[locale].name}</span>
                <span className="text-typography-gray text-[12px] text-start">
                  {languages[locale].enName}
                </span>
              </div>
            </PopoverClose>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
