import SpotlightCard from "@/components/react-bits/SpotlightCard";
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

    if (isLoading) return <SurahSkeleton length={9} />;

    if (isError)
        return (
            <div className="py-12 text-center text-red-500">
                <p>Terjadi kesalahan saat memuat data.</p>
                <p className="mt-2 text-sm text-gray-500">{(error as Error).message}</p>
            </div>
        );

    return (
        <div className="space-y-4">
            {data?.pages.map((page, i) => (
                <div key={i} className="grid grid-cols-3 gap-3">
                    {page.data.map((surah) => (
                        <Link href={`/products/quran/surah/${surah?.id}`} key={surah.id} prefetch>
                            <SpotlightCard
                                className="flex cursor-pointer items-start justify-between gap-4 rounded-lg bg-neutral-800 p-4"
                                spotlightColor="rgba(96, 16, 221, 0.4)"
                            >
                                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-neutral-700">
                                    <span className="font-semibold text-purple-100">{surah.id}</span>
                                </div>
                                <div className="flex w-full shrink justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">{surah.latin}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{surah.translation}</p>
                                    </div>
                                    <div className="text-right">
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">{surah.arabic}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{surah.numAyah} Ayat</p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </Link>
                    ))}
                </div>
            ))}

            {isFetchingNextPage && <SurahSkeleton length={9} />}

            <div ref={loadMoreRef} className="h-10" />
        </div>
    );
};

export default SurahContent;
