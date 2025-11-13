"use client";

import ShinySeachInput from "@/components/ShinySearchInput";
import { SurahDetailSkeleton } from "@/components/skeleton/skeleton-surah";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useInfiniteHadisBySource } from "@/lib/api/hadis";
import { useState } from "react";
import HadisItem from "./hadis-item";

interface HadisListProps {
    source: string;
}

const HadisList = ({ source }: HadisListProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteHadisBySource(source, {
        limit: 20,
        q: searchQuery,
    });

    const loadMoreRef = useInfiniteScroll({
        enabled: hasNextPage,
        onIntersect: fetchNextPage,
    });

    if (isError) return <div className="py-8 text-center text-red-500">Gagal memuat data: {(error as Error).message}</div>;

    return (
        <section className="space-y-4">
            <ShinySeachInput placeholder={`Cari Hadis ${source}...`} delay={400} isLoading={isLoading} onDebouncedChange={setSearchQuery} />

            {isLoading ? (
                <SurahDetailSkeleton />
            ) : (
                <div className="space-y-6">
                    {data?.pages.map((page, i) => (
                        <div key={i} className="space-y-4">
                            {page.data.map((hadis) => {
                                return <HadisItem key={hadis?.uuid} hadis={hadis} />;
                            })}
                        </div>
                    ))}

                    {isFetchingNextPage && <SurahDetailSkeleton />}
                    <div ref={loadMoreRef} className="h-10" />
                </div>
            )}
        </section>
    );
};

export default HadisList;
