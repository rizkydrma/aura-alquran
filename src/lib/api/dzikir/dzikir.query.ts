import { CustomQueryOptions, getNextPage } from "@/lib/query-client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getDzikirByUUID, getDzikirGroupedByType, getDzikirs } from "./dzikir.fetcher";

type DzikirGroupedFetcher = typeof getDzikirGroupedByType;
export function useDzikirGroupedByType(params?: { type?: string }, options?: CustomQueryOptions<DzikirGroupedFetcher>) {
    return useQuery({
        queryKey: ["dzikirs-group", params],
        queryFn: () => getDzikirGroupedByType(params),
        enabled: options?.enabled ?? true,
        ...options,
    });
}

export function useDzikirs(params?: { limit?: number; q?: string }) {
    return useQuery({
        queryKey: ["dzikirs", params],
        queryFn: () => getDzikirs(params),
    });
}

export function useDzikirDetail(uuid: string) {
    return useQuery({
        queryKey: ["dzikir"],
        queryFn: () => getDzikirByUUID(uuid),
        enabled: !!uuid,
    });
}

export function useInfiniteDzikirs(params?: { limit?: number; q?: string; type?: string }) {
    return useInfiniteQuery({
        queryKey: ["dzikirs", params],
        queryFn: async ({ pageParam = 1 }) => getDzikirs({ ...params, page: pageParam }),
        getNextPageParam: (lastPage) => getNextPage(lastPage.meta),
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5,
    });
}
