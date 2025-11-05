import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { SurahSkeleton } from "@/components/skeleton/skeleton-surah";
import { useJuz } from "@/lib/api/ayats";
import Link from "next/link";
import * as React from "react";

const JuzContent: React.FC = ({}) => {
    const { data, isLoading, isError, error } = useJuz();

    if (isLoading) return <SurahSkeleton length={9} />;

    if (isError)
        return (
            <div className="py-12 text-center text-red-500">
                <p>Terjadi kesalahan saat memuat data.</p>
                <p className="mt-2 text-sm text-neutral-500">{(error as Error).message}</p>
            </div>
        );

    return (
        <div className="grid grid-cols-3 gap-3">
            {data?.data?.map((juz) => (
                <Link key={juz?.juz} href={`/products/quran/juz/${juz?.juz}`}>
                    <SpotlightCard
                        className="flex cursor-pointer items-start justify-between gap-4 rounded-lg bg-neutral-800 p-4"
                        spotlightColor="rgba(96, 16, 221, 0.4)"
                    >
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-neutral-700">
                            <span className="font-semibold text-purple-100">{juz?.juz}</span>
                        </div>

                        <div className="flex flex-1 flex-col gap-1">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-gray-800 dark:text-gray-100">Juz {juz?.juz}</h3>
                                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{juz?.total_ayat} Ayat</h3>
                            </div>

                            <div className="flex flex-wrap">
                                {(() => {
                                    const maxShown = 2;
                                    const surahs = juz?.surahs ?? [];
                                    const visible = surahs.slice(0, maxShown);
                                    const remaining = surahs.length - maxShown;

                                    return (
                                        <>
                                            {visible.map((surah, i) => (
                                                <p key={surah?.id} className="text-sm text-gray-500 dark:text-gray-400">
                                                    {surah?.latin}
                                                    {i < visible.length - 1 ? ", " : " "}
                                                </p>
                                            ))}
                                            {remaining > 0 && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400">&nbsp; and {remaining} others</p>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    </SpotlightCard>
                </Link>
            ))}
        </div>
    );
};

export default JuzContent;
