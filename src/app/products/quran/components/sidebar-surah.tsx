"use client";

import { Input } from "@/components/ui/input";
import { SurahSkeleton } from "@/components/skeleton/skeleton-surah";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useInfiniteSurahs } from "@/lib/api/surahs";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as React from "react";

const SidebarSurah: React.FC = ({}) => {
    const { surahId } = useParams<{ surahId: string }>();
    const [searchQuery, setSearchQuery] = React.useState("");
    const [debouncedQuery, setDebouncedQuery] = React.useState("");

    React.useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(searchQuery), 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useInfiniteSurahs({
        limit: 18,
        q: debouncedQuery,
    });

    const loadMoreRef = useInfiniteScroll({
        enabled: hasNextPage && !isFetchingNextPage,
        onIntersect: fetchNextPage,
    });

    return (
        <div className="h-[600px] overflow-y-auto">
            <div className="mb-4">
                <Input placeholder="Cari surah..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full" />
            </div>
            {isLoading || !data ? (
                <SurahSkeleton />
            ) : debouncedQuery && isFetching ? (
                <div className="py-4 text-center text-gray-500">Mencari surah...</div>
            ) : (
                <>
                    {data.pages.map((page, i) => (
                        <div key={i} className="grid grid-cols-1 gap-3 text-xs">
                            {page.data.map((surah) => {
                                const isActive = surahId === surah.surahId.toString();
                                return (
                                    <Link
                                        href={`/products/quran/surah/${surah?.surahId}`}
                                        key={surah.surahId}
                                        className={`flex cursor-pointer items-center justify-between rounded-xl p-4 shadow transition hover:shadow-md ${
                                            isActive
                                                ? "border-2 border-purple-400 bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.8)] dark:border-purple-500 dark:shadow-[0_0_15px_rgba(129,140,248,0.8)]"
                                                : "bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                                        }`}
                                        prefetch
                                    >
                                        <div>
                                            <h3 className={`font-semibold ${isActive ? "text-white" : "text-gray-800 dark:text-gray-100"}`}>
                                                {surah.arabic}
                                            </h3>
                                            <h3 className={`font-semibold ${isActive ? "text-white" : "text-gray-800 dark:text-gray-100"}`}>
                                                {surah.latin}
                                            </h3>
                                            <p className={`text-sm ${isActive ? "text-purple-200" : "text-gray-500 dark:text-gray-400"}`}>
                                                {surah.translation}
                                            </p>
                                        </div>
                                        <span className={`font-semibold ${isActive ? "text-purple-100" : "text-emerald-600"}`}>{surah.surahId}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    ))}

                    {isFetchingNextPage && <SurahSkeleton />}

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
    );
};

export default SidebarSurah;
