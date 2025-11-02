"use client";

import { SurahSkeleton } from "@/components/skeleton/skeleton-surah";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useInfiniteAyats } from "@/lib/api/ayats";
import { IAyat } from "@/lib/api/ayats/ayats.types";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

const SurahDetail = () => {
    const { surahId } = useParams<{ surahId: string }>();
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteAyats(surahId, { limit: 100 });

    const loadMoreRef = useInfiniteScroll({
        enabled: hasNextPage && !isFetchingNextPage,
        onIntersect: fetchNextPage,
    });

    // Audio player state
    const [currentAyatIndex, setCurrentAyatIndex] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Get all ayats in flat array
    const allAyats = data?.pages.flatMap((page) => page.data) || [];

    // Play/pause controls
    const playAyat = async (ayatIndex: number) => {
        const audio = audioRef.current;
        if (!audio) return;

        if (currentAyatIndex === ayatIndex && isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            // If switching to a different ayat, load it first
            if (currentAyatIndex !== ayatIndex) {
                setCurrentAyatIndex(ayatIndex);
                setIsPlaying(true);
                // Audio will be loaded and played in the useEffect
            } else {
                // Same ayat, just play/pause
                try {
                    await audio.play();
                    setIsPlaying(true);
                } catch (err) {
                    console.log("Play failed", err);
                    setIsPlaying(false);
                }
            }
        }
    };

    // Audio event handlers
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleLoadStart = () => {
            setCurrentTime(0);
            setDuration(0);
        };

        const handleCanPlay = async () => {
            if (isPlaying) {
                try {
                    await audio.play();
                } catch (err) {
                    console.log("Play failed", err);
                    setIsPlaying(false);
                }
            }
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleDurationChange = () => {
            setDuration(audio.duration);
        };

        const handleError = () => {
            console.error("Audio error occurred");
            setIsPlaying(false);
        };

        audio.addEventListener("loadstart", handleLoadStart);
        audio.addEventListener("canplay", handleCanPlay);
        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("durationchange", handleDurationChange);
        audio.addEventListener("error", handleError);

        return () => {
            audio.removeEventListener("loadstart", handleLoadStart);
            audio.removeEventListener("canplay", handleCanPlay);
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("durationchange", handleDurationChange);
            audio.removeEventListener("error", handleError);
        };
    }, [currentAyatIndex, isPlaying]);

    // Load audio when current ayat changes
    useEffect(() => {
        const loadAudio = async () => {
            if (currentAyatIndex !== null && allAyats[currentAyatIndex]?.audio) {
                const audio = audioRef.current;
                if (audio) {
                    try {
                        audio.pause();
                        audio.currentTime = 0;
                        // Use proxy URL to avoid CORS issues
                        const proxyUrl = `/api/audio/${encodeURIComponent(allAyats[currentAyatIndex].audio)}`;
                        audio.load();
                    } catch (err) {
                        console.error("Error loading audio:", err);
                        setIsPlaying(false);
                    }
                }
            }
        };

        loadAudio();
    }, [currentAyatIndex, allAyats, playbackRate]);

    const changePlaybackRate = (rate: number) => {
        setPlaybackRate(rate);
        if (audioRef.current) {
            audioRef.current.playbackRate = rate;
        }
    };

    if (isLoading) return <SurahSkeleton />;

    if (isError)
        return (
            <div className="py-12 text-center text-red-500">
                <p>Terjadi kesalahan saat memuat data.</p>
                <p className="mt-2 text-sm text-gray-500">{(error as Error).message}</p>
            </div>
        );
    return (
        <section>
            {/* Surah Header */}
            <div className="mb-8 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-6 dark:border-gray-600 dark:from-gray-800 dark:to-gray-700">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Detail Surah</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Temukan ayat-ayat Al-Quran dan terjemahannya.</p>
            </div>
            {/* Ayat List */}
            <div className="space-y-6">
                {data?.pages.map((page, i) => (
                    <div key={i} className="space-y-4">
                        {page.data.map((ayat, pageIndex) => {
                            const globalIndex = data.pages.slice(0, i).reduce((acc, p) => acc + p.data.length, 0) + pageIndex;
                            const isCurrentAyat = globalIndex === currentAyatIndex;

                            return (
                                <div
                                    key={ayat.uuid}
                                    className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-xl"
                                >
                                    <div className="mb-4 flex items-start justify-between">
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${isCurrentAyat && isPlaying ? "animate-pulse bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200" : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-200"}`}
                                        >
                                            {ayat.ayatNumber}
                                        </div>
                                        {ayat.audio && (
                                            <Button
                                                variant={isCurrentAyat && isPlaying ? "secondary" : "outline"}
                                                size="sm"
                                                onClick={() => playAyat(globalIndex)}
                                                className="shrink-0"
                                            >
                                                {isCurrentAyat && isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                            </Button>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <h3 className="mb-3 text-2xl leading-relaxed font-bold text-emerald-600 dark:text-emerald-400">
                                            {ayat.arabic}
                                        </h3>
                                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{ayat.latin}</p>
                                        <div className="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                            <p className="leading-relaxed text-gray-600 dark:text-gray-300">{ayat.translation}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}

                {isFetchingNextPage && <SurahSkeleton count={3} />}
                <div ref={loadMoreRef} className="h-10" />
            </div>

            {/* Bottom Audio Player Overlay */}
            {currentAyatIndex !== null && allAyats[currentAyatIndex] && (
                <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/95">
                    <div className="mx-auto max-w-4xl">
                        {/* Progress Bar */}
                        <div className="mb-3">
                            <div className="flex items-center gap-2">
                                <span className="min-w-[40px] text-xs text-gray-500 dark:text-gray-400">
                                    {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, "0")}
                                </span>
                                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div
                                        className="h-full bg-emerald-500 transition-all duration-200 dark:bg-emerald-400"
                                        style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                    ></div>
                                </div>
                                <span className="min-w-[40px] text-xs text-gray-500 dark:text-gray-400">
                                    {Math.floor(duration / 60)}:{(duration % 60).toFixed(0).padStart(2, "0")}
                                </span>
                                <span className="min-w-[30px] text-right text-xs text-red-500 dark:text-red-400">
                                    -{Math.floor((duration - currentTime) / 60)}:{((duration - currentTime) % 60).toFixed(0).padStart(2, "0")}
                                </span>
                            </div>
                        </div>

                        {/* Player Controls */}
                        <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-200">
                                            {allAyats[currentAyatIndex]?.ayatNumber}
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Ayat {allAyats[currentAyatIndex]?.ayatNumber}
                                        </p>
                                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">Surah {surahId}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Playback Rate Controls */}
                                <div className="flex items-center gap-1">
                                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                                        <Button
                                            key={rate}
                                            variant={playbackRate === rate ? "secondary" : "ghost"}
                                            size="sm"
                                            onClick={() => changePlaybackRate(rate)}
                                            className="h-8 px-2 text-xs"
                                        >
                                            {rate}x
                                        </Button>
                                    ))}
                                </div>

                                {/* Play/Pause Control */}
                                <Button variant="default" size="icon" onClick={() => playAyat(currentAyatIndex)} className="h-12 w-12">
                                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Hidden Audio Element */}
            <audio ref={audioRef} preload="none" crossOrigin="anonymous" style={{ display: "none" }} />
        </section>
    );
};

export default SurahDetail;
