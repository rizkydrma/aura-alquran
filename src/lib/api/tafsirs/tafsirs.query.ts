import { useQuery } from "@tanstack/react-query";
import { getTafsirByAyat } from "./tafsirs.fetcher";
import { CustomQueryOptions, CustomQueryResult } from "@/lib/query-client";

type TafsirFetcher = typeof getTafsirByAyat;

export function useTafsirByAyat(ayatId: string, options?: CustomQueryOptions<TafsirFetcher>): CustomQueryResult<TafsirFetcher> {
    return useQuery({
        queryKey: ["tafsir", ayatId],
        queryFn: () => getTafsirByAyat(ayatId),
        enabled: !!ayatId && (options?.enabled ?? true),
        ...options,
    });
}
