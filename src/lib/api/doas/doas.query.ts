import { getDoaByUUID, getDoas } from "@/lib/api/doas";
import { useQuery } from "@tanstack/react-query";

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
