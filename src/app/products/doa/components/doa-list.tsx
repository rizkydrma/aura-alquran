"use client";

import ShinySeachInput from "@/components/ShinySearchInput";
import { SkeletonDoaList } from "@/components/skeleton/skeleton-doa";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useInfiniteDoas } from "@/lib/api/doas";
import { useState } from "react";
import DoaItem from "./doa-item";

interface DoaListProps {
    source: string;
}

const DoaList = ({ source }: DoaListProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteDoas({
        limit: 20,
        q: searchQuery,
        source,
    });

    const loadMoreRef = useInfiniteScroll({
        enabled: hasNextPage,
        onIntersect: fetchNextPage,
    });

    if (isError) return <div className="py-8 text-center text-red-500">Gagal memuat data: {(error as Error).message}</div>;

    return (
        <section className="space-y-4">
            <ShinySeachInput placeholder={`Cari Doa ${source}...`} delay={400} isLoading={isLoading} onDebouncedChange={setSearchQuery} />

            {isLoading ? (
                <SkeletonDoaList />
            ) : (
                <div className="space-y-6">
                    {data?.pages.map((page, i) => (
                        <div key={i} className="space-y-4">
                            {page.data.map((doa) => {
                                return <DoaItem key={doa?.uuid} doa={doa} />;
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

export default DoaList;
