"use client";

import Bismillah from "@/components/bismillah";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { SurahDetailSkeleton } from "@/components/skeleton/skeleton-surah";
import { Button } from "@/components/ui/button";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { IAyat, useInfiniteAyats } from "@/lib/api/ayats";
import { Play } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import AyatAudioPlayer from "./ayat-audio-player";
import { formatTranslationWithSuperscript } from "@/lib/utils";

const SurahDetail = () => {
    const { surahId } = useParams<{ surahId: string }>();
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteAyats(surahId, { limit: 20 });
    console.log(data);
    const loadMoreRef = useInfiniteScroll({
        enabled: hasNextPage,
        onIntersect: fetchNextPage,
    });

    const [currentAyat, setCurrentAyat] = useState<IAyat | null>(null);

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
                                key={ayat?.uuid}
                                className="rounded-xl border bg-white p-8 dark:bg-neutral-900"
                                spotlightColor="rgba(96, 16, 221, 0.4)"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-purple-800 text-sm font-semibold text-neutral-100">
                                        {ayat?.ayatNumber}
                                    </div>

                                    <div className="space-y-2 text-right">
                                        <h3 className="text-2xl font-bold text-neutral-200">{ayat?.arabic}</h3>
                                        <h3 className="font-medium text-neutral-400">{ayat?.latin}</h3>
                                        <p
                                            className="text-sm text-neutral-300"
                                            dangerouslySetInnerHTML={{ __html: formatTranslationWithSuperscript(ayat?.translation) }}
                                        />

                                        {ayat?.footnotes && (
                                            <div className="mt-6">
                                                <h5 className="text-xs font-bold text-neutral-200">Catatan Kaki :</h5>
                                                <p
                                                    className="text-xs text-neutral-100"
                                                    dangerouslySetInnerHTML={{ __html: formatTranslationWithSuperscript(ayat?.footnotes) }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center justify-end gap-4">
                                    {ayat.audio && (
                                        <Button size="sm" onClick={() => setCurrentAyat(ayat)}>
                                            <Play className="h-4 w-4" />
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

            <AyatAudioPlayer ayat={currentAyat} onClose={() => setCurrentAyat(null)} />
        </section>
    );
};

export default SurahDetail;
