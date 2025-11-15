"use client";

import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { SkeletonDoaSidebar } from "@/components/skeleton/skeleton-doa";
import { useDzikirGroupedByType } from "@/lib/api/dzikir";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, InfoIcon } from "lucide-react";
import Link from "next/link";

interface SidebarDzikirProps {
    type: string;
}

const SidebarDzikir = ({ type }: SidebarDzikirProps) => {
    const { data, isLoading, isError, error } = useDzikirGroupedByType();

    return (
        <div className="relative">
            <div className="pb-14] h-[80dvh] space-y-4 overflow-y-auto [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]">
                {isLoading ? (
                    <SkeletonDoaSidebar align="vertical" />
                ) : data?.data?.length ? (
                    <div className="flex flex-col gap-3">
                        {data?.data?.map((dzikir) => {
                            const isActive = type == dzikir?.type;

                            return (
                                <Link key={dzikir?.type} prefetch href={`/products/dzikir/${dzikir?.type}`}>
                                    <SpotlightCard
                                        className={cn(
                                            "flex cursor-pointer items-start justify-between gap-4 rounded-lg !p-4",
                                            isActive ? "bg-gradient-to-tr from-purple-800 to-purple-950" : "bg-neutral-800",
                                        )}
                                        spotlightColor="rgba(96, 16, 221, 0.4)"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-sm font-semibold text-gray-800 capitalize dark:text-gray-100">{dzikir?.type}</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{dzikir?.total_dzikir} Dzikir</p>
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
                        <span>Dzikir tidak ditemukan.</span>
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

export default SidebarDzikir;
