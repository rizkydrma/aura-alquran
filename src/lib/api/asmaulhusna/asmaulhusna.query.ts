import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAsmaulHusnaByUUID, getAsmaulHusnas } from "./asmaulhusna.fetcher";
import { getNextPage } from "@/lib/query-client";

export function useAsmaulHusna(params?: { page?: number; limit?: number; q?: string }) {
    return useQuery({
        queryKey: ["asmaulhusnas", params],
        queryFn: () => getAsmaulHusnas(params),
    });
}

export function useAsmaulHusnaDetail(uuid: string) {
    return useQuery({
        queryKey: ["asmaulhusna", uuid],
        queryFn: () => getAsmaulHusnaByUUID(uuid),
        enabled: !!uuid,
    });
}

export function useInfiniteAsmaulHusna(params?: { limit?: number; q?: string }) {
    return useInfiniteQuery({
        queryKey: ["asmaulhusna", params],
        queryFn: async ({ pageParam = 1 }) => getAsmaulHusnas({ ...params, page: pageParam }),
        getNextPageParam: (lastPage) => getNextPage(lastPage.meta),
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5,
    });
}
