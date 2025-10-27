"use client";

import { SurahSkeleton } from "@/components/skeleton/skeleton-surah";
import { Heading } from "@/components/typhography";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useInfiniteSurahs } from "@/lib/api/surahs";
import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const QuranContent = () => {
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
        <section className="mx-auto max-w-7xl py-24">
            <Heading size="h1" className="text-center">
                Start the Journey of Enlightenment
            </Heading>

            <Tabs defaultValue="surah" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="surah">Surah</TabsTrigger>
                    <TabsTrigger value="juz">Juz</TabsTrigger>
                </TabsList>
                <TabsContent value="surah">Surah</TabsContent>
                <TabsContent value="juz">Juz </TabsContent>
            </Tabs>
            <div className="mt-16 space-y-4">
                {data?.pages.map((page, i) => (
                    <div key={i} className="grid grid-cols-3 gap-3 space-y-3">
                        {page.data.map((surah) => (
                            <div
                                key={surah.surahId}
                                className="flex cursor-pointer items-center justify-between rounded-xl bg-white p-4 shadow transition hover:shadow-md dark:bg-gray-800"
                            >
                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">{surah.arabic}</h3>
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">{surah.latin}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{surah.translation}</p>
                                </div>
                                <span className="font-semibold text-emerald-600">{surah.surahId}</span>
                            </div>
                        ))}
                    </div>
                ))}

                {isFetchingNextPage && <SurahSkeleton count={3} />}

                <div ref={loadMoreRef} className="h-10" />
            </div>
        </section>
    );
};

const QuranPage = () => {
    return (
        <Suspense fallback={<SurahSkeleton count={10} />}>
            <QuranContent />
        </Suspense>
    );
};

export default QuranPage;
