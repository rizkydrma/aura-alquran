import { apiClient } from "@/lib/api-client";
import { IHadis } from "./hadis.types";
import { IPagination } from "@/types";

export async function getHadisGroupedBySource() {
    return apiClient<{ data: { source: string; total_hadis: number }[] }>(`/api/hadis`);
}

export function getHadisBySource(source: string, params?: { page?: number; limit?: number; q?: string }) {
    const search = new URLSearchParams(params as Record<string, string>);
    return apiClient<{ data: IHadis[]; meta: IPagination }>(`/hadis/${source}?${search}`);
}
