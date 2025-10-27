import { useQuery } from "@tanstack/react-query";
import { getAyats, getAyatByNumber, getJuz } from "@/lib/api/ayats";

export function useAyats(surahId: string, params?: { page?: number; limit?: number; q?: string }) {
    return useQuery({
        queryKey: ["ayats", surahId, params],
        queryFn: () => getAyats(surahId, params),
        enabled: !!surahId,
    });
}

export function useAyatDetail(surahId: string, ayatNumber: string) {
    return useQuery({
        queryKey: ["ayat", surahId, ayatNumber],
        queryFn: () => getAyatByNumber(surahId, ayatNumber),
        enabled: !!surahId && !!ayatNumber,
    });
}

export function useJuz() {
    return useQuery({
        queryKey: ["juz"],
        queryFn: () => getJuz(),
    });
}
