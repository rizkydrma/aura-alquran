import { apiClient } from "@/lib/api-client";
import { IPagination } from "@/types";
import { IDzikir } from "./dzikir.types";

export async function getDzikirs(params?: { page?: number; limit?: number; q?: string }) {
    const search = new URLSearchParams(params as Record<string, string>);
    return apiClient<{ data: IDzikir[]; meta: IPagination }>(`/api/dzikirs?${search}`);
}

export async function getDzikirByUUID(uuid: string) {
    return apiClient<IDzikir>(`/api/dzikirs/${uuid}`);
}
