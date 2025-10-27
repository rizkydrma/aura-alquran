import { getAyatByNumber, getAyats, getJuz } from "@/lib/api/ayats";
import { getNextPage } from "@/lib/query-client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

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

export function useInfiniteAyats(surahId: string, params?: { limit?: number; q?: string }) {
    return useInfiniteQuery({
        queryKey: ["ayats", params],
        queryFn: async ({ pageParam = 1 }) => getAyats(surahId, { ...params, page: pageParam }),
        getNextPageParam: (lastPage) => getNextPage(lastPage.meta),
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5,
    });
}
