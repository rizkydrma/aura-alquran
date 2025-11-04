"use client";

import Bismillah from "@/components/bismillah";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { SurahDetailSkeleton } from "@/components/skeleton/skeleton-surah";
import { Button } from "@/components/ui/button";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useInfiniteAyats } from "@/lib/api/ayats";
import { Pause, Play } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SurahDetail = () => {
    const { surahId } = useParams<{ surahId: string }>();
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteAyats(surahId, { limit: 20 });

    const loadMoreRef = useInfiniteScroll({
        enabled: hasNextPage,
        onIntersect: fetchNextPage,
    });

    const [currentAyat, setCurrentAyat] = useState<any | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // handle play/pause
    const playAyat = (ayat: any) => {
        const audio = audioRef.current;
        if (!audio) return;

        // toggle ayat yang sama
        if (currentAyat?.uuid === ayat.uuid) {
            if (isPlaying) audio.pause();
            else audio.play();
            return;
        }

        // ayat baru
        setCurrentAyat(ayat);
    };

    // load audio ketika currentAyat berubah
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !currentAyat?.audio) return;

        audio.src = currentAyat.audio; // CDN langsung
        audio.load();
        audio
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        setCurrentTime(0);
    }, [currentAyat]);

    // attach listeners hanya sekali
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTime = () => setCurrentTime(audio.currentTime);
        const handleDur = () => setDuration(audio.duration || 0);
        const handlePause = () => setIsPlaying(false);
        const handlePlay = () => setIsPlaying(true);
        const handleEnd = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };

        audio.addEventListener("timeupdate", handleTime);
        audio.addEventListener("loadedmetadata", handleDur);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("play", handlePlay);
        audio.addEventListener("ended", handleEnd);

        return () => {
            audio.removeEventListener("timeupdate", handleTime);
            audio.removeEventListener("loadedmetadata", handleDur);
            audio.removeEventListener("pause", handlePause);
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("ended", handleEnd);
        };
    }, []);

    if (isLoading) return <SurahDetailSkeleton />;
    if (isError) return <div className="py-8 text-center text-red-500">Gagal memuat data: {(error as Error).message}</div>;

    return (
        <section className="space-y-4">
            <SpotlightCard
                className="flex items-center justify-center rounded-xl border bg-white p-8 py-4 dark:bg-neutral-900"
                spotlightColor="rgba(96, 16, 221, 0.4)"
            >
                <Bismillah />
            </SpotlightCard>

            {/* List Ayat */}
            <div className="space-y-6">
                {data?.pages.map((page, i) => (
                    <div key={i} className="space-y-4">
                        {page.data.map((ayat) => (
                            <SpotlightCard
                                key={ayat.uuid}
                                className="rounded-xl border bg-white p-8 dark:bg-neutral-900"
                                spotlightColor="rgba(96, 16, 221, 0.4)"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-purple-800 font-bold text-neutral-100">
                                        {ayat.ayatNumber}
                                    </div>

                                    <div className="space-y-2 text-right">
                                        <h3 className="text-2xl font-bold text-neutral-200">{ayat.arabic}</h3>
                                        <h3 className="font-medium text-neutral-400">{ayat.latin}</h3>
                                        <p className="text-sm text-neutral-300">{ayat.translation}</p>
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center justify-end gap-4">
                                    {ayat.audio && (
                                        <Button
                                            variant={currentAyat?.uuid === ayat.uuid && isPlaying ? "secondary" : "outline"}
                                            size="sm"
                                            onClick={() => playAyat(ayat)}
                                        >
                                            {currentAyat?.uuid === ayat.uuid && isPlaying ? (
                                                <Pause className="h-4 w-4" />
                                            ) : (
                                                <Play className="h-4 w-4" />
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                ))}

                {isFetchingNextPage && <SurahDetailSkeleton />}
                <div ref={loadMoreRef} className="h-10" />
            </div>

            {/* Bottom Audio Player Overlay */}
            {currentAyat && (
                <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-neutral-200 bg-white/95 p-4 shadow-lg backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/95">
                    <div className="mx-auto max-w-4xl">
                        {/* Progress Bar */}
                        <div className="mb-3 flex items-center gap-2">
                            <span className="min-w-[40px] text-xs text-neutral-500 dark:text-neutral-400">
                                {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, "0")}
                            </span>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                                <div
                                    className="h-full bg-purple-500 transition-all duration-200 dark:bg-purple-400"
                                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                />
                            </div>
                            <span className="min-w-[40px] text-xs text-neutral-500 dark:text-neutral-400">
                                {Math.floor(duration / 60)}:{(duration % 60).toFixed(0).padStart(2, "0")}
                            </span>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                                    <span className="text-sm font-bold text-purple-600 dark:text-purple-200">{currentAyat.ayatNumber}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Ayat {currentAyat.ayatNumber}</p>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Surah {surahId}</p>
                                </div>
                            </div>

                            <Button variant="default" size="icon" onClick={() => playAyat(currentAyat)} className="h-12 w-12">
                                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Hidden Audio */}
            <audio ref={audioRef} preload="none" hidden />
        </section>
    );
};

export default SurahDetail;
