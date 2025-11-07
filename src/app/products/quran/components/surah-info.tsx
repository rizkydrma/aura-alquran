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
            <div className="relative space-y-5 p-4">
                {/* Title Section */}
                <div className="space-y-1 text-center">
                    <h1 className="text-4xl font-semibold text-white" style={{ fontFamily: "serif" }}>
                        {surah?.arabic}
                    </h1>
                    <h2 className="text-lg font-bold text-neutral-100">{surah?.latin}</h2>
                    <p className="text-sm text-neutral-200 italic">{surah?.translation}</p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-3 divide-x divide-purple-500/20 rounded-lg border bg-transparent p-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                        <BookOpenIcon className="h-4 w-4 text-purple-200" />
                        <span className="text-xs text-gray-400">Ayat</span>
                        <span className="text-sm font-semibold text-white">{surah?.numAyah}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <FileTextIcon className="h-4 w-4 text-purple-200" />
                        <span className="text-xs text-gray-400">Halaman</span>
                        <span className="text-sm font-semibold text-white">{surah?.page}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <MapPinIcon className="h-4 w-4 text-purple-200" />
                        <span className="text-xs text-gray-400">Tempat</span>
                        <span className="text-sm font-semibold text-white">{surah?.location}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-3">
                    <IntroSurahDialog introSurah={surah?.introSurah ?? ""} />
                    <OutroSurahDialog outroSurah={surah?.outroSurah ?? ""} />
                </div>
            </div>
        </SpotlightCard>
    );
};

export default SurahInfo;
