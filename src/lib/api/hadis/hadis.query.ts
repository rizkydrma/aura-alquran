import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getHadisBySource, getHadisGroupedBySource } from "./hadis.fetcher";
import { CustomQueryOptions, getNextPage } from "@/lib/query-client";

type HadisGroupedFetcher = typeof getHadisGroupedBySource;
export function useHadisGroupedBySource(options?: CustomQueryOptions<HadisGroupedFetcher>) {
    return useQuery({
        queryKey: ["hadis-grouped-source"],
        queryFn: () => getHadisGroupedBySource(),
        enabled: options?.enabled ?? true,
        ...options,
    });
}

export function useInfiniteHadisBySource(source: string, params?: { limit?: number; q?: string }) {
    return useInfiniteQuery({
        queryKey: ["hadis", source, params],
        queryFn: async ({ pageParam = 1 }) => getHadisBySource(source, { ...params, page: pageParam }),
        getNextPageParam: (lastPage) => getNextPage(lastPage.meta),
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5,
    });
}
