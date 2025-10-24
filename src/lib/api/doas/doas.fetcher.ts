import { apiClient } from "@/lib/api-client";
import { IPagination } from "@/types";
import { IDoa } from "./doas.types";

export async function getDoas(params?: { page?: number; limit?: number; q?: string }) {
    const search = new URLSearchParams(params as Record<string, string>);
    return apiClient<{ data: IDoa[]; meta: IPagination }>(`/api/doas?${search}`);
}

export async function getDoaByUUID(uuid: string) {
    return apiClient<IDoa>(`/api/doas/${uuid}`);
}
