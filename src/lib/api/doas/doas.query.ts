import { getDoaByUUID, getDoas } from "@/lib/api/doas";
import { getNextPage } from "@/lib/query-client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useDoas() {
    return useQuery({
        queryKey: ["doas"],
        queryFn: () => getDoas(),
    });
}

export function useDoaDetail(uuid: string) {
    return useQuery({
        queryKey: ["doa"],
        queryFn: () => getDoaByUUID(uuid),
        enabled: !!uuid,
    });
}

export function useInfiniteDoas(params?: { limit?: number; q?: string }) {
    return useInfiniteQuery({
        queryKey: ["doas", params],
        queryFn: async ({ pageParam = 1 }) => getDoas({ ...params, page: pageParam }),
        getNextPageParam: (lastPage) => getNextPage(lastPage.meta),
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5,
    });
}
