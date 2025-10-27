import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getHadisBySource, getHadisGroupedBySource } from "./hadis.fetcher";
import { getNextPage } from "@/lib/query-client";

export function useHadisGroupedBySource() {
    return useQuery({
        queryKey: ["hadis-grouped-source"],
        queryFn: () => getHadisGroupedBySource(),
    });
}

export function useInfiniteHadisBySourc(source: string, params?: { limit?: number; q?: string }) {
    return useInfiniteQuery({
        queryKey: ["hadis", source, params],
        queryFn: async ({ pageParam = 1 }) => getHadisBySource(source, { ...params, page: pageParam }),
        getNextPageParam: (lastPage) => getNextPage(lastPage.meta),
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5,
    });
}
