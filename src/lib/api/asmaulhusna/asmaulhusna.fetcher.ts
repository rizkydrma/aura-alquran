import { apiClient } from "@/lib/api-client";
import { IPagination } from "@/types";
import { IAsmaulHusna } from "./asmaulhusna.types";

export async function getAsmaulHusnas(params?: { page?: number; limit?: number; q?: string }) {
    const search = new URLSearchParams(params as Record<string, string>);
    return apiClient<{ data: IAsmaulHusna[]; meta: IPagination }>(`/asmaulhusnas?${search}`);
}

export async function getAsmaulHusnaByUUID(uuid: string) {
    return apiClient<IAsmaulHusna>(`/asmaulhusnas/${uuid}`);
}
