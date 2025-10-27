import { useQuery } from "@tanstack/react-query";
import { getHadisGroupedBySource } from "./hadis.fetcher";

export function useHadisGroupedBySource() {
    return useQuery({
        queryKey: ["hadis-grouped-source"],
        queryFn: () => getHadisGroupedBySource(),
    });
}
