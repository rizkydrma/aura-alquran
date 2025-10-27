"use client";

import { SurahSkeleton } from "@/components/skeleton/skeleton-surah";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useInfiniteAyats } from "@/lib/api/ayats";
import { useParams } from "next/navigation";

export default function AyatListPage() {
    const { surahId } = useParams<{ surahId: string }>();
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteAyats(surahId, { limit: 20 });

    const loadMoreRef = useInfiniteScroll({
        enabled: hasNextPage && !isFetchingNextPage,
        onIntersect: fetchNextPage,
    });

    if (isLoading) return <SurahSkeleton />;

    if (isError)
        return (
            <div className="py-12 text-center text-red-500">
                <p>Terjadi kesalahan saat memuat data.</p>
                <p className="mt-2 text-sm text-gray-500">{(error as Error).message}</p>
            </div>
        );

    return (
        <div className="mt-16 space-y-4">
            {data?.pages.map((page, i) => (
                <div key={i} className="grid grid-cols-1 gap-3 space-y-3">
                    {page.data.map((ayat) => (
                        <div
                            key={ayat.uuid}
                            className="flex cursor-pointer items-center justify-between rounded-xl bg-white p-4 shadow transition hover:shadow-md dark:bg-gray-800"
                        >
                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{ayat.arabic}</h3>
                                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{ayat.latin}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{ayat.translation}</p>
                            </div>
                            <span className="font-semibold text-emerald-600">{ayat.ayatNumber}</span>
                        </div>
                    ))}
                </div>
            ))}

            {isFetchingNextPage && <SurahSkeleton count={3} />}

            <div ref={loadMoreRef} className="h-10" />
        </div>
    );
}
