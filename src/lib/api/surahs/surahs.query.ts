import { getNextPage } from "@/lib/query-client";
import { IPaginationResponse } from "@/types";
import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getSurahById, getSurahs } from "./surahs.fetcher";
import { ISurah } from "./surahs.types";

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

export function useInfiniteSurahs(params?: { limit?: number; q?: string }) {
    return useInfiniteQuery<
        IPaginationResponse<ISurah>, // TQueryFnData (hasil tiap page)
        Error, // TError
        InfiniteData<IPaginationResponse<ISurah>>, // TData (data.final => pages + pageParams)
        [string, typeof params], // TQueryKey
        number // TPageParam
    >({
        queryKey: ["surahs", params],
        queryFn: async ({ pageParam = 1 }) => getSurahs({ ...params, page: pageParam }),
        getNextPageParam: (lastPage) => getNextPage(lastPage.meta),
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5,
    });
}
