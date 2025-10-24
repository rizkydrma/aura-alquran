import { useQuery } from "@tanstack/react-query";
import { getDzikirByUUID, getDzikirs } from "./dzikir.fetcher";

export function useDzikirs() {
    return useQuery({
        queryKey: ["dzikirs"],
        queryFn: () => getDzikirs(),
    });
}

export function useDzikirDetail(uuid: string) {
    return useQuery({
        queryKey: ["dzikir"],
        queryFn: () => getDzikirByUUID(uuid),
        enabled: !!uuid,
    });
}
