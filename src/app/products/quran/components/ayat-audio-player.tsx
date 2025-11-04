"use client";

import { Button } from "@/components/ui/button";
import { IAyat } from "@/lib/api/ayats";
import { PauseIcon, PlayIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AyatAudioPlayerProps {
    ayat: IAyat | null;
    onClose: () => void;
}

const AyatAudioPlayer = ({ ayat, onClose }: AyatAudioPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Load ulang audio setiap ayat berubah
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !ayat?.audio) return;

        audio.src = ayat.audio;
        audio.load();

        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => setIsPlaying(false));
        }

        setCurrentTime(0);
        setIsPlaying(true);
    }, [ayat]);

    // Attach event listener setiap kali ada audio baru
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTime = () => setCurrentTime(audio.currentTime);
        const handleDur = () => setDuration(audio.duration || 0);
        const handlePause = () => setIsPlaying(false);
        const handlePlay = () => setIsPlaying(true);
        const handleEnd = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };

        audio.addEventListener("timeupdate", handleTime);
        audio.addEventListener("loadedmetadata", handleDur);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("play", handlePlay);
        audio.addEventListener("ended", handleEnd);

        return () => {
            audio.removeEventListener("timeupdate", handleTime);
            audio.removeEventListener("loadedmetadata", handleDur);
            audio.removeEventListener("pause", handlePause);
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("ended", handleEnd);
        };
    }, [ayat]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        if (!audio || !duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const progress = Math.min(Math.max(clickX / rect.width, 0), 1);
        audio.currentTime = progress * duration;
        setCurrentTime(audio.currentTime);
    };

    if (!ayat) return null;

    return (
        <div>
            <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-neutral-200 bg-white/95 p-4 shadow-lg backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/95">
                <div className="mx-auto max-w-4xl space-y-3">
                    {/* Progress Bar */}
                    <div className="flex items-center gap-2">
                        <span className="min-w-[40px] text-xs text-neutral-500 dark:text-neutral-400">{formatTime(currentTime)}</span>

                        <div
                            className="h-2 flex-1 cursor-pointer overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700"
                            onClick={handleSeek}
                        >
                            <div
                                className="h-full bg-purple-500 transition-all duration-200 dark:bg-purple-400"
                                style={{
                                    width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                                }}
                            />
                        </div>

                        <span className="min-w-[40px] text-xs text-neutral-500 dark:text-neutral-400">{formatTime(duration)}</span>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                                <span className="text-sm font-bold text-purple-600 dark:text-purple-200">{ayat.ayatNumber}</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Ayat {ayat.ayatNumber}</p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">Surah {ayat.surahId}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                    const audio = audioRef.current;
                                    if (audio) audio.pause();
                                    onClose();
                                }}
                                className="h-10 w-10"
                            >
                                <XIcon className="h-5 w-5" />
                            </Button>
                            <Button variant="default" size="icon" onClick={togglePlay} className="h-12 w-12">
                                {isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <audio ref={audioRef} preload="metadata" hidden />
        </div>
    );
};

// Helper untuk format waktu mm:ss
function formatTime(time: number) {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");
    return `${minutes}:${seconds}`;
}

export default AyatAudioPlayer;
