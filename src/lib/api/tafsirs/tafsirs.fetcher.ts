import { apiClient } from "@/lib/api-client";
import { ITafsir } from "./tafsirs.types";

export async function getTafsirByAyat(ayatId: string) {
    return apiClient<{ data: ITafsir }>(`/tafsirs/${ayatId}`);
}
