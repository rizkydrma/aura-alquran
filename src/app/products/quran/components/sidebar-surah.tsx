"use client";

import SpotlightCard from "@/components/react-bits/SpotlightCard";
import ShinySeachInput from "@/components/ShinySearchInput";
import { SidebarSurahSkeleton } from "@/components/skeleton/skeleton-surah";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useInfiniteSurahs } from "@/lib/api/surahs";
import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as React from "react";

const SidebarSurah: React.FC = ({}) => {
    const { surahId } = useParams<{ surahId: string }>();
    const [searchQuery, setSearchQuery] = React.useState("");

    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useInfiniteSurahs({
        limit: 18,
        q: searchQuery,
    });

    const loadMoreRef = useInfiniteScroll({
        enabled: hasNextPage && !isFetchingNextPage,
        onIntersect: fetchNextPage,
    });

    return (
        <div className="relative">
            <div className="h-[80dvh] space-y-4 overflow-y-auto [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]">
                <ShinySeachInput placeholder="Cari surah..." delay={400} isLoading={isLoading} onDebouncedChange={setSearchQuery} />

                {isLoading || !data ? (
                    <SidebarSurahSkeleton align="vertical" length={5} />
                ) : searchQuery && isFetching ? (
                    <div className="py-4 text-center text-gray-500">Mencari surah...</div>
                ) : (
                    <>
                        {data.pages.map((page, i) => (
                            <div key={i} className="grid grid-cols-1 gap-3 text-xs">
                                {page?.data?.length ? (
                                    page.data.map((surah) => {
                                        const isActive = surahId === surah.id.toString();
                                        return (
                                            <Link href={`/products/quran/surah/${surah?.id}`} key={surah.id} prefetch>
                                                <SpotlightCard
                                                    className={cn(
                                                        "flex cursor-pointer items-start justify-between gap-4 rounded-lg !p-4",
                                                        isActive ? "bg-gradient-to-tr from-purple-800 to-purple-950" : "bg-neutral-800",
                                                    )}
                                                    spotlightColor="rgba(96, 16, 221, 0.4)"
                                                >
                                                    <div
                                                        className={cn(
                                                            "grid h-10 w-10 shrink-0 place-items-center rounded-md",
                                                            isActive ? "bg-gradient-to-bl from-purple-800 to-purple-950" : "bg-neutral-700",
                                                        )}
                                                    >
                                                        <span className="font-semibold text-purple-100">{surah.id}</span>
                                                    </div>
                                                    <div className="flex w-full shrink justify-between">
                                                        <div>
                                                            <h3 className="font-semibold text-gray-800 dark:text-gray-100">{surah.latin}</h3>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">{surah.translation}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <h3 className="font-semibold text-gray-800 dark:text-gray-100">{surah.arabic}</h3>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">{surah.numAyah} Ayat</p>
                                                        </div>
                                                    </div>
                                                </SpotlightCard>
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <div className="flex flex-col items-center justify-center gap-1 text-center">
                                        <InfoIcon className="h-3 w-3 shrink-0" />
                                        <span>Surah tidak ditemukan.</span>
                                    </div>
                                )}
                            </div>
                        ))}

                        {isFetchingNextPage && <SidebarSurahSkeleton align="vertical" />}

                        <div ref={loadMoreRef} className="h-10" />
                    </>
                )}

                {isError && (
                    <div className="py-12 text-center text-red-500">
                        <p>Terjadi kesalahan saat memuat data.</p>
                        <p className="mt-2 text-sm text-gray-500">{(error as Error).message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SidebarSurah;
