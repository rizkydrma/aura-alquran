"use client";

import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { SidebarHadisSkeleton } from "@/components/skeleton/skeleton-hadis";
import { useHadisGroupedBySource } from "@/lib/api/hadis";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, InfoIcon } from "lucide-react";
import Link from "next/link";

interface SidebarHadisProps {
    source: string;
}

const SidebarHadis = ({ source }: SidebarHadisProps) => {
    const { data, isLoading, isError, error } = useHadisGroupedBySource();

    return (
        <div className="relative">
            <div className="h-[80dvh] space-y-4 overflow-y-auto [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] pb-14">
                {isLoading ? (
                    <SidebarHadisSkeleton align="vertical" />
                ) : data?.data?.length ? (
                    <div className="flex flex-col gap-3">
                        {data?.data?.map((hadis) => {
                            const isActive = source == hadis?.source;

                            return (
                                <Link key={hadis?.source} href={`/products/hadis/${hadis?.source}`} prefetch>
                                    <SpotlightCard
                                        className={cn(
                                            "flex cursor-pointer items-start justify-between gap-4 rounded-lg !p-4",
                                            isActive ? "bg-gradient-to-tr from-purple-800 to-purple-950" : "bg-neutral-800",
                                        )}
                                        spotlightColor="rgba(96, 16, 221, 0.4)"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-sm font-semibold text-gray-800 capitalize dark:text-gray-100">{hadis?.source}</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{hadis?.total_hadis} Hadis </p>
                                        </div>

                                        <div className="grid shrink-0 place-items-center rounded-md bg-neutral-700 p-2.5">
                                            <ArrowRightIcon className="h-4 w-4" />
                                        </div>
                                    </SpotlightCard>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-1 text-center">
                        <InfoIcon className="h-3 w-3 shrink-0" />
                        <span>Hadis tidak ditemukan.</span>
                    </div>
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

export default SidebarHadis;
