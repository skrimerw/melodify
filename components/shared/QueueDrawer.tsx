"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaListUl } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import PlaylistContext from "./PlaylistContext";
import { useAudioPlayer } from "@/store/use-audio-player";
import Link from "next/link";

interface Props {
  className?: string;
}

export default function QueueDrawer({ className }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isQueueVisible, setIsQueueVisible] = useState(true);
  const song = useAudioPlayer((state) => state.currentSong);
  const songs = useAudioPlayer((state) => state.queue);
  const queueId = useAudioPlayer((state) => state.queueId);

  useEffect(() => {
    let timeout = null;
    if (!isVisible) {
      timeout = setTimeout(() => {
        setIsQueueVisible(true);
      }, 500);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsVisible(false);
      }
    }

    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={className}>
      <FaListUl
        onClick={() => setIsVisible(true)}
        className="ml-auto mr-6 text-white/60 transition-colors cursor-pointer duration-200 hover:text-primary"
        size={20}
      />
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{
              opacity: 0,
              visibility: "hidden",
              translateY: 80,
              transition: {
                duration: 0.2,
              },
            }}
            animate={{
              opacity: 1,
              visibility: "visible",
              translateY: 0,
              transition: {
                duration: 0.2,
              },
            }}
            exit={{
              opacity: 0,
              visibility: "hidden",
              translateY: 80,
              transition: {
                duration: 0.2,
              },
            }}
            className={cn("flex gap-9 fixed inset-0 z-100 bg-[#1d3a49] px-10")}
          >
            <button
              className="absolute top-10 right-10 z-20 flex items-center justify-center rounded-full bg-white/15 size-12 backdrop-blur-2xl transition-all duration-300 cursor-pointer hover:scale-110 hover:bg-white/20"
              onClick={() => setIsVisible(false)}
            >
              <ChevronDown size={24} />
            </button>
            <AnimatePresence>
              {isVisible && (
                <>
                  <motion.div
                    initial={{
                      opacity: 0,
                      translateX: 200,
                    }}
                    animate={
                      isQueueVisible
                        ? {
                            opacity: 1,
                            translateX: 0,
                            transition: {
                              delay: 0.2,
                              duration: 0.7,
                              type: "spring",
                            },
                          }
                        : {
                            opacity: 1,
                            translateX: "50%",
                            transition: {
                              delay: 0.2,
                              duration: 0.7,
                              type: "spring",
                            },
                          }
                    }
                    exit={{
                      opacity: 0,
                    }}
                    className={cn(
                      "flex flex-col items-center justify-center w-[40%] ml-auto h-full"
                    )}
                  >
                    <div className="flex flex-col gap-6 items-center">
                      <div className="group relative w-full aspect-square max-w-[400px] rounded-sm overflow-hidden shadow-[0px_8px_12px_4px_rgba(0,0,0,0.25)]">
                        <img
                          src={song?.album.imageUrl.replace(
                            "300x300",
                            "800x800"
                          )}
                          alt={song?.title}
                        />

                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 bg-black/60 invisible opacity-0 transition-opacity duration-300 cursor-pointer group-hover:opacity-100 group-hover:visible">
                          <motion.button
                            onClick={() => {
                              setIsQueueVisible((prev) => !prev);
                            }}
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: "rgba(51,51,51,0.9)",
                              transition: {
                                duration: 0.2,
                              },
                            }}
                            className="flex items-center justify-center col-start-3 row-start-1 self-start justify-self-end mr-5 mt-5 rounded-full bg-card/80 size-16 cursor-pointer"
                          >
                            <FaListUl
                              className={cn(!isQueueVisible && "opacity-60")}
                              size={22}
                            />
                          </motion.button>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <Link
                          onClick={() => setIsVisible(false)}
                          href={`/album/${song?.albumId}`}
                          className="hover:underline"
                        >
                          {song?.title}
                        </Link>
                        <Link
                          onClick={() => setIsVisible(false)}
                          href={`/artist/${song?.artistId}`}
                          className="text-white/50 hover:text-primary transition-colors duration-200"
                        >
                          {song?.artist.name}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{
                      opacity: 0,
                      translateX: -200,
                    }}
                    animate={
                      isQueueVisible
                        ? {
                            opacity: 1,
                            translateX: 0,
                            transition: {
                              delay: 0.2,
                              duration: 0.7,
                              type: "spring",
                            },
                          }
                        : {
                            opacity: 0,
                            visibility: "hidden",
                            zIndex: -1,
                            translateX: -200,
                            transition: {
                              delay: 0.2,
                              duration: 0.7,
                              type: "spring",
                            },
                          }
                    }
                    exit={{
                      opacity: 0,
                    }}
                    className={cn(
                      "flex flex-col w-1/2 h-full queue-track-list"
                    )}
                  >
                    <PlaylistContext
                      className="my-10 py-10 pl-2 h-full w-full overflow-auto invisible-scrollbar"
                      songs={songs}
                      queueId={queueId || ""}
                    />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
