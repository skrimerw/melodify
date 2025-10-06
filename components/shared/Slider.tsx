"use client";

import React, { useEffect, useId, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  slides: React.ReactNode[];
}

export default function Slider({ title, slides }: Props) {
  const prevBtnId = useId();
  const nextBtnId = useId();
  const [isGrid, setIsGrid] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsGrid(false);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect;

  return (
    <div className="group/slider relative">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl mb-1">{title}</h2>
        <div className="flex gap-2 opacity-0 transition-opacity group-hover/slider:opacity-100">
          <Button
            variant={"outline"}
            className={`slider-prev-btn__${prevBtnId} flex items-center justify-center !p-0 !bg-transparent border-2 size-8`}
          >
            <ChevronLeft className="!size-5 mr-0.5" />
          </Button>
          <Button
            variant={"outline"}
            className={`slider-next-btn__${nextBtnId} flex items-center justify-center !p-0 !bg-transparent border-2 size-8`}
          >
            <ChevronRight className="!size-5" />
          </Button>
        </div>
      </div>
      <Swiper
        slidesPerView={6}
        spaceBetween={16}
        modules={[Navigation]}
        navigation={{
          enabled: true,
          nextEl: `.slider-next-btn__${nextBtnId}`,
          prevEl: `.slider-prev-btn__${prevBtnId}`,
        }}
        className={cn(
          "w-full !z-0",
          isGrid &&
            "[&>.swiper-wrapper]:!grid [&>.swiper-wrapper]:grid-cols-6 [&>.swiper-wrapper]:gap-4"
        )}
      >
        {slides.map((slide) => {
          return <SwiperSlide>{slide}</SwiperSlide>;
        })}
      </Swiper>
    </div>
  );
}
