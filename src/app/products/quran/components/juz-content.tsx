import { SurahSkeleton } from "@/components/skeleton/skeleton-surah";
import { useJuz } from "@/lib/api/ayats";
import * as React from "react";

const JuzContent: React.FC = ({}) => {
    const { data, isLoading, isError, error } = useJuz();

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
            {data?.data?.map((juz) => (
                <div
                    key={juz?.juz}
                    className="flex cursor-pointer items-center justify-between rounded-xl bg-white p-4 shadow transition hover:shadow-md dark:bg-gray-800"
                >
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{juz?.total_ayat}</p>
                    </div>
                    <span className="font-semibold text-emerald-600">{juz?.juz}</span>
                </div>
            ))}
        </div>
    );
};

export default JuzContent;
