"use client";

import { SurahDetailSkeleton } from "@/components/skeleton/skeleton-surah";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { IAyat, useInfiniteAyatsByJuzNumber } from "@/lib/api/ayats";
import { useParams } from "next/navigation";
import { Fragment, useMemo, useState } from "react";
import AyatAudioPlayer from "./ayat-audio-player";
import AyatDetail from "./ayat-detail";
import SurahInfo from "./surah-info";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import Bismillah from "@/components/bismillah";

const JuzDetail = () => {
    const { juzId } = useParams<{ juzId: string }>();
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteAyatsByJuzNumber(juzId, { limit: 20 });

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
            {/* List Ayat */}
            <div className="space-y-6">
                {data?.pages.map((page, i) => (
                    <div key={i} className="space-y-4">
                        {page.data.map((ayat, index) => {
                            const absoluteIndex = mergedAyats.findIndex((a) => a.id === ayat.id);

                            const prevSurahId = page?.data[index - 1]?.surahId;
                            const isNewSurah = ayat?.surahId !== prevSurahId;

                            return (
                                <div key={ayat?.id} className="space-y-4">
                                    {isNewSurah && (
                                        <Fragment>
                                            <SurahInfo surahId={ayat?.surahId} />
                                            <SpotlightCard
                                                className="flex items-center justify-center rounded-xl border bg-white p-8 py-4 dark:bg-neutral-900"
                                                spotlightColor="rgba(96, 16, 221, 0.4)"
                                            >
                                                <Bismillah />
                                            </SpotlightCard>
                                        </Fragment>
                                    )}
                                    <AyatDetail
                                        absoluteIndex={absoluteIndex}
                                        ayat={ayat}
                                        currentIndex={currentIndex}
                                        setCurrentIndex={setCurrentIndex}
                                    />
                                </div>
                            );
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

export default JuzDetail;
