"use client";

import Bismillah from "@/components/bismillah";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { SurahDetailSkeleton } from "@/components/skeleton/skeleton-surah";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { IAyat, useInfiniteAyats } from "@/lib/api/ayats";
import { useMemo, useState } from "react";
import AyatAudioPlayer from "./ayat-audio-player";
import AyatDetail from "./ayat-detail";
import SurahInfo from "./surah-info";

interface SurahDetailProps {
    surahId: string;
}

const SurahDetail = ({ surahId }: SurahDetailProps) => {
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteAyats(surahId, { limit: 20 });

    const loadMoreRef = useInfiniteScroll({
        enabled: hasNextPage,
        onIntersect: fetchNextPage,
    });

    // currentIndex menunjuk posisi di mergedAyats (null == tidak ada player active)
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    // flat semua pages jadi satu list mudah diakses oleh player
    const mergedAyats = useMemo<IAyat[]>(() => {
        if (!data?.pages) return [];
        return data.pages.flatMap((p) => p.data);
    }, [data]);

    if (isLoading) return <SurahDetailSkeleton />;
    if (isError) return <div className="py-8 text-center text-red-500">Gagal memuat data: {(error as Error).message}</div>;

    return (
        <section className="space-y-4">
            <SurahInfo surahId={surahId} />
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
                        {page.data.map((ayat) => {
                            const absoluteIndex = mergedAyats.findIndex((a) => a.uuid === ayat.uuid);

                            return <AyatDetail key={ayat?.uuid} absoluteIndex={absoluteIndex} ayat={ayat} setCurrentIndex={setCurrentIndex} />;
                        })}
                    </div>
                ))}

                {isFetchingNextPage && <SurahDetailSkeleton />}
                <div ref={loadMoreRef} className="h-10" />
            </div>

            <AyatAudioPlayer
                ayatList={mergedAyats}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                fetchNextPage={fetchNextPage}
                hasNextPage={!!hasNextPage}
                isFetchingNextPage={!!isFetchingNextPage}
                onClose={() => setCurrentIndex(null)}
            />
        </section>
    );
};

export default SurahDetail;
