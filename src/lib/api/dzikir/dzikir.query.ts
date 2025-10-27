import { getNextPage } from "@/lib/query-client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getDzikirByUUID, getDzikirs } from "./dzikir.fetcher";

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

export function useInfiniteDzikirs(params?: { limit?: number; q?: string }) {
    return useInfiniteQuery({
        queryKey: ["dzikirs", params],
        queryFn: async ({ pageParam = 1 }) => getDzikirs({ ...params, page: pageParam }),
        getNextPageParam: (lastPage) => getNextPage(lastPage.meta),
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5,
    });
}
