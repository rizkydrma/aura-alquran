"use client";

import ShinySeachInput from "@/components/ShinySearchInput";

import { SkeletonDoaList } from "@/components/skeleton/skeleton-doa";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useInfiniteDzikirs } from "@/lib/api/dzikir";
import { useState } from "react";
import DzikirItem from "./dzikir-item";

interface DzikirListProps {
    type: string;
}

const DzikirList = ({ type }: DzikirListProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteDzikirs({
        limit: 20,
        q: searchQuery,
        type,
    });

    const loadMoreRef = useInfiniteScroll({
        enabled: hasNextPage,
        onIntersect: fetchNextPage,
    });

    if (isError) return <div className="py-8 text-center text-red-500">Gagal memuat data: {(error as Error).message}</div>;

    return (
        <section className="space-y-4">
            <ShinySeachInput placeholder={`Cari Dzikir ${type}...`} delay={400} isLoading={isLoading} onDebouncedChange={setSearchQuery} />

            {isLoading ? (
                <SkeletonDoaList />
            ) : (
                <div className="space-y-6">
                    {data?.pages.map((page, i) => (
                        <div key={i} className="space-y-4">
                            {page.data.map((dzikir) => {
                                return <DzikirItem key={dzikir?.uuid} dzikir={dzikir} />;
                            })}
                        </div>
                    ))}

                    {isFetchingNextPage && <SkeletonDoaList />}
                    <div ref={loadMoreRef} className="h-10" />
                </div>
            )}
        </section>
    );
};

export default DzikirList;
