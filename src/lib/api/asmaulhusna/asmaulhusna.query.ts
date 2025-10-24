import { useQuery } from "@tanstack/react-query";
import { getAsmaulHusnaByUUID, getAsmaulHusnas } from "./asmaulhusna.fetcher";

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
