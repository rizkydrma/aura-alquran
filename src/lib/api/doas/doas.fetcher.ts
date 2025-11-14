import { apiClient } from "@/lib/api-client";
import { IPagination } from "@/types";
import { IDoa, IDoaGroupedBySource } from "./doas.types";

export async function getDoaGroupedBySource(params?: { source?: string }) {
    const search = new URLSearchParams(params as Record<string, string>);
    return apiClient<{ data: IDoaGroupedBySource[] }>(`/api/doas?${search}`);
}

export async function getDoas(params?: { page?: number; limit?: number; q?: string; source?: string }) {
    const search = new URLSearchParams(params as Record<string, string>);
    return apiClient<{ data: IDoa[]; meta: IPagination }>(`/api/doas/all?${search}`);
}

export async function getDoaByUUID(uuid: string) {
    return apiClient<IDoa>(`/api/doas/${uuid}`);
}
