import { getDoaByUUID, getDoaGroupedBySource, getDoas } from "@/lib/api/doas";
import { CustomQueryOptions, getNextPage } from "@/lib/query-client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

type DoaGroupedFetcher = typeof getDoaGroupedBySource;
export function useDoaGroupedBySource(params: { source?: string }, options?: CustomQueryOptions<DoaGroupedFetcher>) {
    return useQuery({
        queryKey: ["doa-grouped", params],
        queryFn: () => getDoaGroupedBySource(params),
        enabled: options?.enabled ?? true,
        ...options,
    });
}

export function useDoas() {
    return useQuery({
        queryKey: ["doas"],
        queryFn: () => getDoas(),
    });
}

export function useDoaDetail(uuid: string) {
    return useQuery({
        queryKey: ["doa", uuid],
        queryFn: () => getDoaByUUID(uuid),
        enabled: !!uuid,
    });
}

export function useInfiniteDoas(params?: { limit?: number; q?: string; source?: string }) {
    return useInfiniteQuery({
        queryKey: ["doas", params],
        queryFn: async ({ pageParam = 1 }) => getDoas({ ...params, page: pageParam }),
        getNextPageParam: (lastPage) => getNextPage(lastPage.meta),
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5,
        enabled: !!params?.source,
    });
}
