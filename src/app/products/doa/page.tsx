"use client";

import BlurText from "@/components/BlurText";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { SkeletonDoa } from "@/components/skeleton/skeleton-doa";
import { IDoaGroupedBySource, useDoaGroupedBySource } from "@/lib/api/doas";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const DoaPage: React.FC = ({}) => {
    const [animationComplete, setAnimationComplete] = useState(false);
    const { data, isLoading, isError, error } = useDoaGroupedBySource({}, { enabled: animationComplete });

    const grouped = useMemo(() => {
        if (!data?.data || isLoading) return [];

        return data.data.reduce<IDoaGroupedBySource[]>((acc, doa) => {
            if (doa.source === "lainnya") {
                acc.push(doa);
            } else {
                acc.unshift(doa);
            }
            return acc;
        }, []);
    }, [data, isLoading]);

    if (isError) {
        return (
            <div className="py-12 text-center text-red-500">
                <p>Terjadi kesalahan saat memuat data.</p>
                <p className="mt-2 text-sm text-gray-500">{(error as Error).message}</p>
            </div>
        );
    }

    return (
        <section className="relative mx-auto min-h-screen max-w-7xl space-y-12 p-4 py-24">
            <div className="flex w-full flex-col items-center justify-center pt-20 pb-10">
                <BlurText
                    text="Explore authentic Islamic duas for guidance, gratitude, and strength."
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="text-3xl md:text-4xl lg:text-5xl"
                    onAnimationComplete={() => setAnimationComplete(true)}
                />
            </div>

            {isLoading ? (
                <SkeletonDoa length={9} />
            ) : (
                <div className="grid grid-cols-3 gap-3">
                    {grouped?.map((doa) => (
                        <Link key={doa?.source} href={`/products/doa/${doa?.source}`} prefetch>
                            <SpotlightCard
                                className="flex cursor-pointer items-start justify-between gap-4 rounded-lg bg-neutral-800 p-4"
                                spotlightColor="rgba(96, 16, 221, 0.4)"
                            >
                                <div className="flex flex-col gap-2">
                                    <h3 className="font-semibold text-gray-800 capitalize dark:text-gray-100">{doa?.source}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{doa?.total_doa} Doa</p>
                                </div>

                                <div className="grid shrink-0 place-items-center rounded-md bg-neutral-700 p-3">
                                    <ArrowRightIcon className="h-5 w-5" />
                                </div>
                            </SpotlightCard>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
};

export default DoaPage;
