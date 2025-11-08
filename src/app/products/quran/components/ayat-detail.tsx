import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { Button } from "@/components/ui/button";
import { IAyat } from "@/lib/api/ayats";
import { formatTranslationWithSuperscript } from "@/lib/utils";
import { PauseIcon, PlayIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import TafsirDialog from "./tafsir-dialog";

interface AyatDetailProps {
    ayat: IAyat;
    absoluteIndex: number;
    currentIndex: number | null;
    setCurrentIndex: Dispatch<SetStateAction<number | null>>;
}

const AyatDetail: React.FC<AyatDetailProps> = ({ absoluteIndex, ayat, setCurrentIndex, currentIndex }) => {
    const isPlaying = currentIndex === absoluteIndex; // 👈 apakah ayat ini sedang diputar

    const handleTogglePlay = () => {
        setCurrentIndex(isPlaying ? null : absoluteIndex);
    };

    return (
        <SpotlightCard className="rounded-xl border bg-white p-8 dark:bg-neutral-900" spotlightColor="rgba(96, 16, 221, 0.4)">
            <div className="flex items-start justify-between gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-purple-800 text-sm font-semibold text-neutral-100">
                    {ayat?.ayatNumber}
                </div>

                <div className="space-y-2 text-right">
                    <h3 className="text-2xl font-bold text-neutral-200">{ayat?.arabic}</h3>
                    <h3 className="font-medium text-neutral-400">{ayat?.latin}</h3>
                    <p
                        className="text-sm text-neutral-300"
                        dangerouslySetInnerHTML={{ __html: formatTranslationWithSuperscript(ayat?.translation) }}
                    />

                    {ayat?.footnotes && (
                        <div className="mt-6">
                            <h5 className="text-xs font-bold text-neutral-200">Catatan Kaki :</h5>
                            <p
                                className="text-xs text-neutral-100"
                                dangerouslySetInnerHTML={{ __html: formatTranslationWithSuperscript(ayat?.footnotes) }}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-4">
                <TafsirDialog ayat={ayat} />

                {ayat.audio && (
                    <Button size="sm" onClick={handleTogglePlay}>
                        {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                    </Button>
                )}
            </div>
        </SpotlightCard>
    );
};

export default AyatDetail;
