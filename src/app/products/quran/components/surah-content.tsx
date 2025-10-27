import { SurahSkeleton } from "@/components/skeleton/skeleton-surah";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useInfiniteSurahs } from "@/lib/api/surahs";
import Link from "next/link";
import * as React from "react";

const SurahContent: React.FC = ({}) => {
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteSurahs({ limit: 18 });

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
                <div key={i} className="grid grid-cols-3 gap-3 space-y-3">
                    {page.data.map((surah) => (
                        <Link
                            href={`/products/quran/surah/${surah?.surahId}`}
                            key={surah.surahId}
                            className="flex cursor-pointer items-center justify-between rounded-xl bg-white p-4 shadow transition hover:shadow-md dark:bg-gray-800"
                            prefetch
                        >
                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{surah.arabic}</h3>
                                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{surah.latin}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{surah.translation}</p>
                            </div>
                            <span className="font-semibold text-emerald-600">{surah.surahId}</span>
                        </Link>
                    ))}
                </div>
            ))}

            {isFetchingNextPage && <SurahSkeleton count={3} />}

            <div ref={loadMoreRef} className="h-10" />
        </div>
    );
};

export default SurahContent;
