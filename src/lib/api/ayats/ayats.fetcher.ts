import { apiClient } from "@/lib/api-client";
import { IPagination } from "@/types";
import { IAyat } from "./ayats.types";

export async function getAyats(surahId: string, params?: { page?: number; limit?: number; q?: string }) {
    const search = new URLSearchParams(params as Record<string, string>);
    return apiClient<{ data: IAyat[]; meta: IPagination }>(`/surahs/${surahId}/ayats?${search}`);
}

export async function getAyatByNumber(surahId: string, ayatNumber: string) {
    return apiClient<IAyat>(`/surahs/${surahId}/ayats/${ayatNumber}`);
}
