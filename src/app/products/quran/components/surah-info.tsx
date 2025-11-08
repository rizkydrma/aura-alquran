"use client";

import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { SurahInfoSkeleton } from "@/components/skeleton/skeleton-surah";
import { useSurahDetail } from "@/lib/api/surahs";
import { BookOpenIcon, FileTextIcon, MapPinIcon } from "lucide-react";
import IntroSurahDialog from "./intro-surah-dialog";
import OutroSurahDialog from "./outro-surah-dialog";

interface SurahInfoProps {
    surahId: string;
}

const SurahInfo = ({ surahId }: SurahInfoProps) => {
    const { data, isLoading, isError, error } = useSurahDetail(surahId);

    if (isLoading) return <SurahInfoSkeleton />;
    if (isError) return <div className="py-8 text-center text-red-500">Gagal memuat data: {(error as Error).message}</div>;

    const surah = data?.data;

    return (
        <SpotlightCard className="relative overflow-hidden rounded-2xl border bg-neutral-900 shadow-md" spotlightColor="rgba(96, 16, 221, 0.4)">
            <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2">
                {/* LEFT SIDE - Title & Translation */}
                <div className="flex flex-col justify-center space-y-2 md:space-y-3">
                    <h1 className="text-4xl leading-tight font-semibold text-white" style={{ fontFamily: "serif" }}>
                        {surah?.arabic}
                    </h1>
                    <h2 className="text-lg font-bold text-neutral-100">{surah?.latin}</h2>
                    <p className="text-sm text-neutral-300 italic">{surah?.translation}</p>
                </div>

                {/* RIGHT SIDE - Info + Actions */}
                <div className="flex flex-col items-end justify-end gap-4">
                    {/* Info Grid */}
                    <div className="grid grid-cols-3 gap-4 divide-x divide-neutral-700 rounded-md border border-neutral-700 text-center">
                        {[
                            {
                                icon: <BookOpenIcon className="h-4 w-4 text-neutral-200" />,
                                label: "Ayat",
                                value: surah?.numAyah,
                            },
                            {
                                icon: <FileTextIcon className="h-4 w-4 text-neutral-200" />,
                                label: "Halaman",
                                value: surah?.page,
                            },
                            {
                                icon: <MapPinIcon className="h-4 w-4 text-neutral-200" />,
                                label: "Tempat",
                                value: surah?.location,
                            },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center gap-1 p-2">
                                {item.icon}
                                <span className="text-xs text-gray-400">{item.label}</span>
                                <span className="text-xs font-semibold text-white">{item.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center gap-2">
                        <IntroSurahDialog introSurah={surah?.introSurah ?? ""} />
                        <OutroSurahDialog outroSurah={surah?.outroSurah ?? ""} />
                    </div>
                </div>
            </div>
        </SpotlightCard>
    );
};

export default SurahInfo;
