import { useQuery } from "@tanstack/react-query";
import { getSurahById, getSurahs } from "./surahs.fetcher";

export function useSurahs(params?: { page?: number; limit?: number; q?: string }) {
    return useQuery({
        queryKey: ["surahs", params],
        queryFn: () => getSurahs(params),
    });
}

export function useSurahDetail(surahId: string) {
    return useQuery({
        queryKey: ["surah", surahId],
        queryFn: () => getSurahById(surahId),
        enabled: !!surahId,
    });
}
