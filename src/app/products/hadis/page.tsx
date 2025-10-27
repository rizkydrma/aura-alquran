"use client";

import { SurahSkeleton } from "@/components/skeleton/skeleton-surah";
import { useHadisGroupedBySource } from "@/lib/api/hadis";
import Link from "next/link";
import * as React from "react";

const HadisPage: React.FC = ({}) => {
    const { data, isLoading, isError, error } = useHadisGroupedBySource();

    if (isLoading) return <SurahSkeleton />;

    if (isError)
        return (
            <div className="py-12 text-center text-red-500">
                <p>Terjadi kesalahan saat memuat data.</p>
                <p className="mt-2 text-sm text-gray-500">{(error as Error).message}</p>
            </div>
        );

    return (
        <div className="grid grid-cols-3 gap-3">
            {data?.data?.map((hadis) => (
                <Link
                    key={hadis?.source}
                    href={`/products/hadis/${hadis?.source}`}
                    className="flex cursor-pointer items-center justify-between rounded-xl bg-white p-4 shadow transition hover:shadow-md dark:bg-gray-800"
                >
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{hadis?.source}</p>
                    </div>
                    <span className="font-semibold text-emerald-600">{hadis?.total_hadis}</span>
                </Link>
            ))}
        </div>
    );
};

export default HadisPage;
