"use client";

import { Button } from "@/components/ui/button";
import { IAyat } from "@/lib/api/ayats";
import { PauseIcon, PlayIcon, SkipBackIcon, SkipForwardIcon, XIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
    ayatList: IAyat[]; // merged ayat list across pages
    currentIndex: number | null;
    setCurrentIndex: (i: number | null) => void;
    fetchNextPage: () => Promise<unknown> | void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    onClose: () => void;
}

const AyatAudioPlayer = ({ ayatList, currentIndex, setCurrentIndex, fetchNextPage, hasNextPage, isFetchingNextPage, onClose }: Props) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    // prevent duplicate fetches triggered by ended while fetching
    const isPrefetchingRef = useRef(false);

    // derived current ayat
    const ayat = currentIndex !== null && currentIndex >= 0 ? (ayatList[currentIndex] ?? null) : null;

    // play when current index changes
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (!ayat) {
            // noop: if no ayat selected, pause and reset
            audio.pause();
            audio.removeAttribute("src");
            audio.load();
            setIsPlaying(false);
            setCurrentTime(0);
            setDuration(0);
            return;
        }

        // set src and play
        audio.src = ayat.audio;
        audio.load();
        const p = audio.play();
        if (p !== undefined) {
            p.catch(() => {
                // autoplay prevented, keep paused state
                setIsPlaying(false);
            });
        }
        // reset time & duration will be set by loadedmetadata
        setCurrentTime(0);
    }, [ayat]);

    // attach listener and cleanup; bind on every ayat change ensures correct audio events
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTime = () => setCurrentTime(audio.currentTime);
        const handleDur = () => setDuration(audio.duration || 0);
        const handlePause = () => setIsPlaying(false);
        const handlePlay = () => setIsPlaying(true);
        const handleEnded = async () => {
            setIsPlaying(false);
            setCurrentTime(0);

            // auto-next logic:
            if (currentIndex === null) return;

            const isLastInList = currentIndex >= ayatList.length - 1;

            if (!isLastInList) {
                setCurrentIndex(currentIndex + 1);
                return;
            }

            // reached last known item
            if (hasNextPage && !isFetchingNextPage && !isPrefetchingRef.current) {
                try {
                    isPrefetchingRef.current = true;
                    const prevLen = ayatList.length;
                    // fetchNextPage may return a promise
                    const res = fetchNextPage();
                    if (res instanceof Promise) await res;
                    // small delay to let react-query merge pages; but we can just check length after microtask
                    // Note: merged list is coming from parent; after it updates, currentIndex handler (above) will run
                    // if there are new items we proceed to next index
                    // Wait for next event loop tick for parent to update ayatList
                    await new Promise((r) => setTimeout(r, 150)); // small wait; tweak as needed
                    const newLen = ayatList.length;
                    if (newLen > prevLen) {
                        setCurrentIndex(currentIndex + 1);
                    } else {
                        // no more items returned, stop playback
                        setIsPlaying(false);
                    }
                } catch (e) {
                    // fetch failed; keep stopped
                    console.error("fetchNextPage error:", e);
                    setIsPlaying(false);
                } finally {
                    isPrefetchingRef.current = false;
                }
                return;
            }

            // no next page available
            setIsPlaying(false);
        };

        audio.addEventListener("timeupdate", handleTime);
        audio.addEventListener("loadedmetadata", handleDur);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("play", handlePlay);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", handleTime);
            audio.removeEventListener("loadedmetadata", handleDur);
            audio.removeEventListener("pause", handlePause);
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("ended", handleEnded);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, ayatList, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const togglePlay = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }, []);

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        if (!audio || !duration || !e.currentTarget) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const progress = Math.min(Math.max(clickX / rect.width, 0), 1);
        audio.currentTime = progress * duration;
        setCurrentTime(audio.currentTime);
    };

    // previous / next manual controls
    const handleNext = async () => {
        if (currentIndex === null) return;
        const isLastInList = currentIndex >= ayatList.length - 1;
        if (!isLastInList) {
            setCurrentIndex(currentIndex + 1);
            return;
        }
        if (hasNextPage && !isFetchingNextPage && !isPrefetchingRef.current) {
            isPrefetchingRef.current = true;
            try {
                const prevLen = ayatList.length;
                const res = fetchNextPage();
                if (res instanceof Promise) await res;
                await new Promise((r) => setTimeout(r, 150));
                if (ayatList.length > prevLen) setCurrentIndex(currentIndex + 1);
            } catch (e) {
                console.error(e);
            } finally {
                isPrefetchingRef.current = false;
            }
        }
    };

    const handlePrev = () => {
        if (currentIndex === null) return;
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    if (!ayat) return null;

    return (
        <div>
            <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-neutral-200 bg-white/95 p-4 shadow-lg backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/95">
                <div className="mx-auto max-w-4xl space-y-3">
                    {/* Progress Bar */}
                    <div className="flex items-center gap-2">
                        <span className="min-w-[40px] text-xs text-neutral-500 dark:text-neutral-400">{formatTime(currentTime)}</span>

                        <div
                            className="h-2 flex-1 cursor-pointer overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700"
                            onClick={handleSeek}
                        >
                            <div
                                className="h-full bg-purple-500 transition-all duration-200 dark:bg-purple-400"
                                style={{
                                    width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                                }}
                            />
                        </div>

                        <span className="min-w-[40px] text-xs text-neutral-500 dark:text-neutral-400">{formatTime(duration)}</span>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                                <span className="text-sm font-bold text-purple-600 dark:text-purple-200">{ayat.id}</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Ayat {ayat.latin}</p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">Surah {ayat.surahId}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={handlePrev}>
                                <SkipBackIcon className="h-6 w-6" />
                            </Button>

                            <Button variant="ghost" size="icon" onClick={togglePlay}>
                                {isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    const audio = audioRef.current;
                                    if (audio) audio.pause();
                                    onClose();
                                    setCurrentIndex(null);
                                }}
                            >
                                <XIcon className="h-6 w-6" />
                            </Button>

                            <Button variant="ghost" size="icon" onClick={handleNext}>
                                <SkipForwardIcon className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <audio ref={audioRef} preload="metadata" hidden />
        </div>
    );
};

// Helper untuk format waktu mm:ss
function formatTime(time: number) {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");
    return `${minutes}:${seconds}`;
}

export default AyatAudioPlayer;
