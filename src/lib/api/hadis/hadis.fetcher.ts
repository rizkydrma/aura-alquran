import { apiClient } from "@/lib/api-client";
import { IPagination } from "@/types";
import { IHadis } from "./hadis.types";

export async function getHadisGroupedBySource() {
    return apiClient<{ data: IHadis[]; meta: IPagination }>(`/api/hadis`);
}

export async function getDzikirByUUID(uuid: string) {
    return apiClient<IHadis>(`/api/dzikirs/${uuid}`);
}
