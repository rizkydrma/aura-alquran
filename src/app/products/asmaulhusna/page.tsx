"use client";

import BlurText from "@/components/BlurText";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { AsmaulHusnaSkeleton } from "@/components/skeleton/skeleton-asmaulhusna";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useInfiniteAsmaulHusna } from "@/lib/api/asmaulhusna";

const AsmaulHusnaPage: React.FC = ({}) => {
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteAsmaulHusna({ limit: 33 });

    const loadMoreRef = useInfiniteScroll({
        enabled: hasNextPage && !isFetchingNextPage,
        onIntersect: fetchNextPage,
    });

    if (isError)
        return (
            <div className="py-12 text-center text-red-500">
                <p>Terjadi kesalahan saat memuat data.</p>
                <p className="mt-2 text-sm text-gray-500">{(error as Error).message}</p>
            </div>
        );

    return (
        <section className="relative mx-auto min-h-screen max-w-7xl space-y-12 p-4 py-24">
            <div className="flex w-full flex-col items-center justify-center pt-20 pb-10">
                <BlurText
                    text="Discover the meanings and significance behind the 99 Names of Allah."
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="text-3xl md:text-4xl lg:text-5xl"
                />
            </div>

            {isLoading ? (
                <AsmaulHusnaSkeleton length={9} />
            ) : (
                <div className="space-y-4">
                    {data?.pages?.map((page, i) => (
                        <div key={i} className="grid grid-cols-3 gap-3">
                            {page?.data?.map((asma) => (
                                <SpotlightCard
                                    key={asma?.uuid}
                                    className="flex cursor-pointer items-start justify-between gap-4 rounded-lg bg-neutral-800 !p-6"
                                    spotlightColor="rgba(96, 16, 221, 0.4)"
                                >
                                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-neutral-700">
                                        <span className="font-semibold text-purple-100">{asma?.asmaulHusnaId}</span>
                                    </div>
                                    <div className="w-full shrink-0 space-y-1">
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">{asma?.arabic}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{asma?.latin}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{asma?.translation}</p>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {isFetchingNextPage && <AsmaulHusnaSkeleton length={9} />}

            <div ref={loadMoreRef} className="h-10" />
        </section>
    );
};

export default AsmaulHusnaPage;
