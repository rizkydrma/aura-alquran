import { apiClient } from "@/lib/api-client";
import { IPagination } from "@/types";
import { IDzikir, IDzikirGroupedByType } from "./dzikir.types";

export async function getDzikirGroupedByType(params?: { type?: string }) {
    const search = new URLSearchParams(params as Record<string, string>);
    return apiClient<{ data: IDzikirGroupedByType[] }>(`/api/dzikirs?${search}`);
}

export async function getDzikirs(params?: { page?: number; limit?: number; q?: string; type?: string }) {
    const search = new URLSearchParams(params as Record<string, string>);
    return apiClient<{ data: IDzikir[]; meta: IPagination }>(`/api/dzikirs/all?${search}`);
}

export async function getDzikirByUUID(uuid: string) {
    return apiClient<IDzikir>(`/api/dzikirs/${uuid}`);
}
