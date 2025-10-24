import { apiClient } from "@/lib/api-client";
import { IPagination } from "@/types";
import { ISurah } from "./surahs.types";

export async function getSurahs(params?: { page?: number; limit?: number; q?: string }) {
    const search = new URLSearchParams(params as Record<string, string>);
    return apiClient<{ data: ISurah[]; meta: IPagination }>(`/api/surahs?${search}`);
}

export async function getSurahById(surahId: string) {
    return apiClient<ISurah>(`/api/surahs/${surahId}`);
}
