"use client";

import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { HadisInfoSkeleton } from "@/components/skeleton/skeleton-hadis";
import { useHadisSingleBySource } from "@/lib/api/hadis";

interface HadisInfoProps {
    source: string;
}

const HadisInfo = ({ source }: HadisInfoProps) => {
    const { data, isLoading, isError, error } = useHadisSingleBySource(source);

    if (isLoading) return <HadisInfoSkeleton />;
    if (isError) return <div className="py-8 text-center text-red-500">Gagal memuat data: {(error as Error).message}</div>;

    return (
        <SpotlightCard className="relative overflow-hidden rounded-2xl border bg-neutral-900 p-5 shadow-md" spotlightColor="rgba(96, 16, 221, 0.4)">
            <div className="w-full space-y-1 text-right">
                <h2 className="text-2xl font-bold text-neutral-100 capitalize">{data?.data?.source}</h2>
                <p className="text-lg text-neutral-300 italic">{data?.data?.total_hadis} Hadis</p>
            </div>
        </SpotlightCard>
    );
};

export default HadisInfo;
