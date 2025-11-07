"use client";

import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { SurahDetailSkeleton } from "@/components/skeleton/skeleton-surah";
import { useSurahDetail } from "@/lib/api/surahs";
import { BookOpenIcon, FileTextIcon, InfoIcon, MapPinIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

interface SurahInfoProps {
    surahId: string;
}

const SurahInfo = ({ surahId }: SurahInfoProps) => {
    const { data, isLoading, isError, error } = useSurahDetail(surahId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);

    if (isLoading) return <SurahDetailSkeleton />;
    if (isError) return <div className="py-8 text-center text-red-500">Gagal memuat data: {(error as Error).message}</div>;

    const surah = data?.data;

    const openModal = (title: string, content: string) => {
        setModalContent({ title, content });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setModalContent(null), 300);
    };

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
                    <button
                        onClick={() => openModal("Pengantar Surah", surah?.introSurah ?? "")}
                        className="flex items-center gap-2 rounded-lg border bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-100 transition-all hover:bg-purple-500/20"
                    >
                        <InfoIcon className="h-4 w-4" />
                        Pengantar
                    </button>

                    {surah?.outroSurah && (
                        <button
                            onClick={() => openModal("Penutup Surah", surah?.outroSurah ?? "")}
                            className="flex items-center gap-2 rounded-lg border bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-100 transition-all hover:bg-purple-500/20"
                        >
                            <InfoIcon className="h-4 w-4" />
                            Penutup
                        </button>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && modalContent
                ? createPortal(
                      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={closeModal}>
                          <div
                              onClick={(e) => e.stopPropagation()}
                              className="w-full max-w-md rounded-xl border border-purple-500/30 bg-neutral-900/95 shadow-lg shadow-purple-500/20 lg:max-w-2xl"
                          >
                              <div className="flex items-center justify-between border-b border-purple-500/30 px-5 py-3">
                                  <h3 className="text-lg font-semibold text-white">{modalContent?.title}</h3>
                                  <button onClick={closeModal} className="rounded-md p-1 hover:bg-purple-500/10">
                                      <XIcon className="h-5 w-5 text-purple-400" />
                                  </button>
                              </div>
                              <div className="max-h-[70vh] overflow-y-auto p-5">
                                  <p
                                      className="text-sm leading-relaxed whitespace-pre-line text-gray-300"
                                      dangerouslySetInnerHTML={{ __html: modalContent?.content }}
                                  />
                              </div>
                          </div>
                      </div>,
                      document.body,
                  )
                : null}
        </SpotlightCard>
    );
};

export default SurahInfo;
