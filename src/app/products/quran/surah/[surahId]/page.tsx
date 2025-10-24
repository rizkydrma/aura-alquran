"use client";

import { useAyats } from "@/lib/api/ayats";
import { useParams } from "next/navigation";

export default function AyatListPage() {
    const { surahId } = useParams<{ surahId: string }>();
    const { data, isLoading, error } = useAyats(surahId, { page: 1, limit: 100 });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {(error as Error).message}</p>;

    return (
        <div className="space-y-3">
            {data?.data?.map((ayat) => (
                <div key={ayat.ayatNumber} className="rounded-md border p-3">
                    <p className="font-arabic text-xl">{ayat.arabic}</p>
                    <p className="text-sm text-gray-600">{ayat.translation}</p>
                </div>
            ))}
        </div>
    );
}
