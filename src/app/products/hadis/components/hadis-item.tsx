"use client";

import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { IHadis } from "@/lib/api/hadis";
import { cn } from "@/lib/utils";
import React from "react";

interface HadisItemProps {
    hadis: IHadis;
}

const HadisItem: React.FC<HadisItemProps> = ({ hadis }) => {
    const [expanded, setExpanded] = React.useState(false);
    const contentRef = React.useRef<HTMLParagraphElement>(null);
    const [isLongText, setIsLongText] = React.useState(false);

    // cek otomatis apakah teks panjang (> 4 baris)
    React.useEffect(() => {
        const el = contentRef.current;
        if (el) {
            const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
            const maxHeight = lineHeight * 4;
            setIsLongText(el.scrollHeight > maxHeight);
        }
    }, [hadis]);

    return (
        <SpotlightCard className="rounded-xl border bg-white p-8 dark:bg-neutral-900" spotlightColor="rgba(96, 16, 221, 0.4)">
            <div className="flex flex-col gap-4">
                {/* Nomor hadis */}
                <div className="flex items-start justify-between gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-purple-800 text-sm font-semibold text-neutral-100">
                        {hadis?.number}
                    </div>

                    <div className="space-y-4">
                        {hadis?.title && <h2 className="text-right text-lg leading-relaxed font-bold text-neutral-300">{hadis?.title}</h2>}
                        <h3 className="text-right text-xl leading-relaxed font-bold text-neutral-200">{hadis?.arab}</h3>

                        <p ref={contentRef} className={cn("text-justify text-sm text-neutral-300", !expanded && "line-clamp-4")}>
                            {hadis?.indo}
                        </p>

                        {/* Tombol toggle */}
                        {isLongText && (
                            <button
                                onClick={() => setExpanded((prev) => !prev)}
                                className="self-start text-sm font-medium text-purple-400 transition-colors hover:text-purple-300"
                                type="button"
                            >
                                {expanded ? "Tutup" : "Baca selengkapnya"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </SpotlightCard>
    );
};

export default HadisItem;
