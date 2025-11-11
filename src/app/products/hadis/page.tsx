"use client";

import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { HadisSourceSkeleton } from "@/components/skeleton/skeleton-hadis";
import { Heading } from "@/components/typhography";
import { useHadisGroupedBySource } from "@/lib/api/hadis";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const HadisPage: React.FC = ({}) => {
    const { data, isLoading, isError, error } = useHadisGroupedBySource();

    if (isError)
        return (
            <div className="py-12 text-center text-red-500">
                <p>Terjadi kesalahan saat memuat data.</p>
                <p className="mt-2 text-sm text-gray-500">{(error as Error).message}</p>
            </div>
        );

    return (
        <section className="relative mx-auto max-w-7xl space-y-12 p-4 py-24">
            <Heading size="h2" className="text-center">
                Wisdom from the Prophet, Guidance for Every Heart.
            </Heading>

            {isLoading ? (
                <HadisSourceSkeleton length={9} />
            ) : (
                <div className="grid grid-cols-3 gap-3">
                    {data?.data?.map((hadis) => (
                        <Link key={hadis?.source} href={`/products/hadis/${hadis?.source}`} prefetch>
                            <SpotlightCard
                                className="flex cursor-pointer items-start justify-between gap-4 rounded-lg bg-neutral-800 p-4"
                                spotlightColor="rgba(96, 16, 221, 0.4)"
                            >
                                <div className="flex flex-col gap-2">
                                    <h3 className="font-semibold text-gray-800 capitalize dark:text-gray-100">{hadis?.source}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{hadis?.total_hadis} Hadis </p>
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

export default HadisPage;
