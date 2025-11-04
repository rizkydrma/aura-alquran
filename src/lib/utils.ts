import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Function Utility di file JS/TS Anda
export const formatTranslationWithSuperscript = (text: string | null) => {
    if (!text) return "";

    // Regex:
    // - Mencari satu atau lebih digit (\d+)
    // - Yang diikuti tepat oleh kurung tutup \)
    // - 'g' memastikan semua kemunculan (global) diganti, bukan hanya yang pertama.
    const footnoteRegex = /(\d+)\)/g;

    // Mengganti pola yang ditemukan ($1) dengan tag <sup>...</sup>
    // $1 adalah referensi balik (backreference) ke konten dalam kurung pertama, yaitu digitnya.
    return text.replace(footnoteRegex, "<sup class='text-purple-500 font-semibold'>$1)</sup>");
};
