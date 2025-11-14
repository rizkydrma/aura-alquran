"use client";

import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { SkeletonDoaInfo } from "@/components/skeleton/skeleton-doa";
import { useDoaGroupedBySource } from "@/lib/api/doas";
import * as React from "react";

interface DoaInfoProps {
    source: string;
}

const DoaInfo: React.FC<DoaInfoProps> = ({ source }) => {
    const { data, isLoading, isError, error } = useDoaGroupedBySource({ source });

    if (isLoading) return <SkeletonDoaInfo />;
    if (isError) return <div className="py-8 text-center text-red-500">Gagal memuat data: {(error as Error).message}</div>;

    return (
        <SpotlightCard className="relative overflow-hidden rounded-2xl border bg-neutral-900 p-5 shadow-md" spotlightColor="rgba(96, 16, 221, 0.4)">
            <div className="w-full space-y-1 text-right">
                <h2 className="text-2xl font-bold text-neutral-100 capitalize">{data?.data?.[0]?.source}</h2>
                <p className="text-lg text-neutral-300 italic">{data?.data?.[0]?.total_doa} Doa</p>
            </div>
        </SpotlightCard>
    );
};

export default DoaInfo;
