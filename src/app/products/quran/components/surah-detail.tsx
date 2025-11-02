"use client";

import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { SurahSkeleton } from "@/components/skeleton/skeleton-surah";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { useInfiniteAyats } from "@/lib/api/ayats";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const SurahDetail = () => {
    const { surahId } = useParams<{ surahId: string }>();
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage } = useInfiniteAyats(surahId, { limit: 100 });

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

    if (isLoading) return <SurahSkeleton />;
    if (isError) return <div className="py-8 text-center text-red-500">Gagal memuat data: {(error as Error).message}</div>;

    return (
        <section>
            {/* List Ayat */}
            <div className="space-y-6">
                {data?.pages.map((page, i) => (
                    <div key={i} className="space-y-4">
                        {page.data.map((ayat) => (
                            <div key={ayat.uuid} className="rounded-xl border bg-white p-6 dark:bg-gray-800">
                                <div className="mb-3 flex items-start justify-between">
                                    <div className="shrink-0 font-bold text-emerald-600">{ayat.ayatNumber}</div>

                                    <div className="text-right">
                                        <h3 className="text-2xl font-bold text-emerald-600">{ayat.arabic}</h3>
                                        <h3 className="font-bold text-emerald-800">{ayat.latin}</h3>
                                        <p className="text-gray-100">{ayat.translation}</p>
                                    </div>
                                </div>
                                {ayat.audio && (
                                    <Button
                                        variant={currentAyat?.uuid === ayat.uuid && isPlaying ? "secondary" : "outline"}
                                        size="sm"
                                        onClick={() => playAyat(ayat)}
                                    >
                                        {currentAyat?.uuid === ayat.uuid && isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
                <div ref={loadMoreRef} className="h-10" />
            </div>

            {/* Bottom Audio Player Overlay */}
            {currentAyat && (
                <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/95">
                    <div className="mx-auto max-w-4xl">
                        {/* Progress Bar */}
                        <div className="mb-3 flex items-center gap-2">
                            <span className="min-w-[40px] text-xs text-gray-500 dark:text-gray-400">
                                {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, "0")}
                            </span>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                <div
                                    className="h-full bg-emerald-500 transition-all duration-200 dark:bg-emerald-400"
                                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                />
                            </div>
                            <span className="min-w-[40px] text-xs text-gray-500 dark:text-gray-400">
                                {Math.floor(duration / 60)}:{(duration % 60).toFixed(0).padStart(2, "0")}
                            </span>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-200">{currentAyat.ayatNumber}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Ayat {currentAyat.ayatNumber}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Surah {surahId}</p>
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
