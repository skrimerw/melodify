"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import LogoutBtn from "./LogoutBtn";
import HistoryBack from "./HistoryBack";
import HistoryForward from "./HistoryForward";
import { Session } from "next-auth";
import { useTranslations } from "next-intl";
import { useOverlayedHeadingStore } from "@/store/use-overlayed-heading";

interface Props {
  className?: string;
  session: Session | null;
}

export default function HeaderContent({ className, session }: Props) {
  const t = useTranslations("common");
  const [isBlury, setIsBlury] = useState(false);
  const headerContent = useRef<HTMLDivElement>(null);
  const overlayedHeading = useOverlayedHeadingStore(
    (state) => state.overlayedHeading
  );
  const setOverlayedHeading = useOverlayedHeadingStore(
    (state) => state.setOverlayedHeading
  );

  function onScroll(e: any) {
    if (e.target.scrollTop >= 20) {
      setIsBlury(true);
    } else {
      setIsBlury(false);
    }

    const overlayedHeadingList =
      document.querySelectorAll<HTMLHeadingElement>(".overlayed-heading");
    let lastOverlayedHeading = "";

    overlayedHeadingList.forEach((overlayedHeading) => {
      if (headerContent.current) {
        const overlayedHeadingCoords = overlayedHeading.getBoundingClientRect();
        const headerContentCoords =
          headerContent.current.getBoundingClientRect();

        if (
          overlayedHeadingCoords.top + overlayedHeadingCoords.height / 2 <
          headerContentCoords?.bottom
        ) {
          lastOverlayedHeading = overlayedHeading.textContent as string;
        }
      }
    });

    setOverlayedHeading(lastOverlayedHeading);
  }

  useEffect(() => {
    document
      .querySelector(".main-container")
      ?.addEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={headerContent}
      className={cn(
        "flex justify-between items-center px-6 pb-3 pt-3",
        className
      )}
    >
      <div
        className={cn(
          "absolute -z-1 inset-0 backdrop-blur-[10px] bg-card/10 transition-opacity duration-300 opacity-0",
          isBlury &&
            "opacity-100 background: linear-gradient(180deg, #121212, transparent 100%); bg-gradient-to-b from-[#121212] to-transparent to-100%"
        )}
      ></div>
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <HistoryBack />
          <HistoryForward />
        </div>
        <h2
        
          className={cn(
            "font-ys text-[22px] font-bold transition-opacity duration-300 cursor-default",
            overlayedHeading ? "opacity-100" : "opacity-0"
          )}
        >
          {overlayedHeading}
        </h2>
      </div>
      {session?.user ? (
        <div>
          <LogoutBtn />
          <Button asChild>
            <Link href={`/profile`} className="px-7 ml-4">
              <FaUser />
            </Link>
          </Button>
        </div>
      ) : (
        <div>
          <Button asChild variant="link" className="hover:opacity-85">
            <Link href="/signup" className="mr-2">
              {t("Signup")}
            </Link>
          </Button>
          <Button asChild>
            <Link href="/login" className="px-7">
              {t("Login")}
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
