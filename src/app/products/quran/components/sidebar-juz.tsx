"use client";

import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { SidebarSurahSkeleton } from "@/components/skeleton/skeleton-surah";
import { useJuz } from "@/lib/api/ayats";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

const SidebarJuz = () => {
    const { juzId } = useParams<{ juzId: string }>();
    const { data, isLoading, isError, error } = useJuz();

    if (isLoading) return <SidebarSurahSkeleton align="vertical" length={5} />;
    if (isError)
        return (
            <div className="py-12 text-center text-red-500">
                <p>Terjadi kesalahan saat memuat data.</p>
                <p className="mt-2 text-sm text-neutral-500">{(error as Error).message}</p>
            </div>
        );

    return (
        <div className="relative">
            <div className="h-[80dvh] overflow-y-auto [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] text-xs">
                {data?.data?.map((juz) => {
                    const isActive = juzId === juz?.juz.toString();

                    return (
                        <Link href={`/products/quran/juz/${juz?.juz}`} key={juz?.juz} prefetch>
                            <SpotlightCard
                                className={cn(
                                    "my-3 flex cursor-pointer items-start justify-between gap-4 rounded-lg !p-4",
                                    isActive ? "bg-gradient-to-tr from-purple-800 to-purple-950" : "bg-neutral-800",
                                )}
                                spotlightColor="rgba(96, 16, 221, 0.4)"
                            >
                                <div
                                    className={cn(
                                        "grid h-10 w-10 shrink-0 place-items-center rounded-md",
                                        isActive ? "bg-gradient-to-bl from-purple-800 to-purple-950" : "bg-neutral-700",
                                    )}
                                >
                                    <span className="font-semibold text-purple-100">{juz.juz}</span>
                                </div>
                                <div className="flex flex-1 flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">Juz {juz?.juz}</h3>
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">{juz?.total_ayat} Ayat</h3>
                                    </div>

                                    <div className="line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap">
                                        {(() => {
                                            const maxShown = 1;
                                            const surahs = juz?.surahs ?? [];
                                            const visible = surahs.slice(0, maxShown);
                                            const remaining = surahs.length - maxShown;

                                            return (
                                                <>
                                                    {visible.map((surah, i) => (
                                                        <p key={surah?.id} className="text-gray-500 dark:text-gray-400">
                                                            {surah?.latin}
                                                            <span>{i < visible.length - 1 ? " , " : " "}</span>
                                                        </p>
                                                    ))}
                                                    {remaining > 0 && <p className="text-gray-500 dark:text-gray-400">and {remaining} others</p>}
                                                </>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </SpotlightCard>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default SidebarJuz;
