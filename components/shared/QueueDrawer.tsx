"use client";

import { cn, formatToMinutes } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { FaListUl, FaPause, FaPlay } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import PlaylistContext from "./PlaylistContext";
import { useAudioPlayer } from "@/store/use-audio-player";
import Link from "next/link";
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from "react-icons/io5";
import LikeBtn from "./LikeBtn";
import { VolumeSlider } from "./AudioPlayer";
import { useFullScreenPlayer } from "@/store/use-fullscreen-player";

interface Props {
  className?: string;
}

export default function QueueDrawer({ className }: Props) {
  const isVisible = useFullScreenPlayer((state) => state.isOpen);
  const setIsVisible = useFullScreenPlayer((state) => state.setIsOpen);
  const isQueueVisible = useFullScreenPlayer((state) => state.isExpanded);
  const setIsQueueVisible = useFullScreenPlayer((state) => state.setIsExpanded);
  const song = useAudioPlayer((state) => state.currentSong);
  const songs = useAudioPlayer((state) => state.queue);
  const queueId = useAudioPlayer((state) => state.queueId);
  const isPaused = useAudioPlayer((state) => state.isPaused);
  const prev = useAudioPlayer((state) => state.prev);
  const next = useAudioPlayer((state) => state.next);
  const play = useAudioPlayer((state) => state.play);
  const pause = useAudioPlayer((state) => state.pause);
  const currentTime = useAudioPlayer((state) => state.currentTime);
  const seekTo = useAudioPlayer((state) => state.seekTo);
  const [currentTiming, setCurrentTiming] = useState(currentTime);
  const isChanging = useRef(false);
  const duration = useAudioPlayer((state) => state.duration);

  useEffect(() => {
    if (!isChanging.current) {
      setCurrentTiming(currentTime);
    }
  }, [currentTime]);

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

  function handlePause() {
    if (isPaused) {
      play();
    } else {
      pause();
    }
  }

  function onValueChange(val: number[]) {
    isChanging.current = true;
    setCurrentTiming(val[0]);
  }

  return (
    <div className={className}>
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
            className={cn(
              "flex gap-9 fixed inset-0 z-100 queue-gradient px-10"
            )}
          >
            <button
              className="absolute top-10 right-10 z-20 flex items-center justify-center rounded-full bg-white/15 size-12 backdrop-blur-2xl transition-all duration-300 cursor-pointer hover:scale-110 hover:bg-white/20"
              onClick={() => setIsVisible(false)}
            >
              <ChevronDown size={24} />
            </button>
            <AnimatePresence initial={isQueueVisible}>
              {isVisible && (
                <>
                  <motion.div
                    initial={
                      isQueueVisible
                        ? {
                            opacity: 0,
                            translateX: 200,
                          }
                        : {
                            opacity: 0,
                            translateX: 0,
                          }
                    }
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
                    <div className="flex flex-col items-center max-w-[400px] w-full">
                      <div className="group mb-6 relative w-full aspect-square max-w-[400px] rounded-sm overflow-hidden shadow-[0px_8px_12px_4px_rgba(0,0,0,0.25)]">
                        <img
                          src={song?.album.imageUrl.replace(
                            "300x300",
                            "800x800"
                          )}
                          alt={song?.title}
                          className="object-cover size-full"
                        />

                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 bg-black/60 invisible opacity-0 transition-opacity duration-300 cursor-pointer group-hover:opacity-100 group-hover:visible">
                          <motion.button
                            onClick={() => {
                              setIsQueueVisible(!isQueueVisible);
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
                              className={cn("transition duration-[400ms]", !isQueueVisible && "opacity-50")}
                              size={22}
                            />
                          </motion.button>

                          <div className="flex items-center gap-3 col-start-1 col-span-3 row-start-2 self-center justify-center">
                            <motion.button
                              onClick={prev}
                              disabled={song === null ? true : false}
                              whileHover={{
                                scale: 1.05,
                                backgroundColor: "rgba(51,51,51,0.9)",
                                transition: {
                                  duration: 0.2,
                                },
                              }}
                              className="flex items-center justify-center col-start-3 row-start-1 self-start justify-self-end ml-auto my-auto rounded-full bg-card/80 size-11 cursor-pointer text-xl"
                            >
                              <IoPlaySkipBackSharp />
                            </motion.button>
                            <motion.button
                              disabled={song === null ? true : false}
                              whileHover={{
                                scale: 1.05,
                              }}
                              onClick={handlePause}
                              className="flex items-center justify-center bg-btn-primary size-18 text-[28px] rounded-full p-2 text-background cursor-pointer disabled:bg-typography-gray/30 disabled:cursor-default"
                            >
                              {!isPaused ? (
                                <FaPause />
                              ) : (
                                <FaPlay className="ml-0.5" />
                              )}
                            </motion.button>
                            <motion.button
                              onClick={next}
                              disabled={song === null ? true : false}
                              whileHover={{
                                scale: 1.05,
                                backgroundColor: "rgba(51,51,51,0.9)",
                                transition: {
                                  duration: 0.2,
                                },
                              }}
                              className="flex items-center justify-center col-start-3 row-start-1 self-start justify-self-end mr-auto my-auto rounded-full bg-card/80 size-11 cursor-pointer text-xl"
                            >
                              <IoPlaySkipForwardSharp />
                            </motion.button>
                          </div>

                          {song && (
                            <motion.div
                              whileHover={{
                                scale: 1.05,

                                transition: {
                                  duration: 0.2,
                                },
                              }}
                              className="col-start-3 row-start-3 self-end justify-self-end mr-5 mb-5 rounded-full size-16 cursor-pointer"
                            >
                              <LikeBtn
                                className="flex items-center justify-center text-3xl [&>.heart-outline]:text-primary [&>.heart-filled]:text-white [&>.heart-filled]:hover:opacity-100 bg-card/80 rounded-full size-full hover:bg-[rgba(51,51,51,0.9)]"
                                song={song}
                              />
                            </motion.div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-center mb-4">
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
                      <div className="group w-full">
                        <VolumeSlider
                          className="[&>[data-slot='slider-track']]:bg-white/8 mb-3"
                          value={[currentTiming]}
                          onValueChange={(val) => onValueChange(val)}
                          onValueCommit={(val) => {
                            isChanging.current = false;
                            seekTo(val[0]);
                          }}
                          step={0.001}
                          max={duration}
                        />
                        <div className="opacity-0 flex justify-between font-medium text-[13px] group-hover:opacity-100 transition-all duration-300 text-white/50">
                          <span className="h-5">
                            {formatToMinutes(currentTiming)}
                          </span>
                          <span className="h-5">
                            {formatToMinutes(song?.duration || duration)}
                          </span>
                        </div>
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
                            visibility: "visible",
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
                      className="my-10 py-10 pl-2 h-full w-full overflow-auto invisible-scrollbar pt-44"
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
