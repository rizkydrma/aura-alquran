import { cn } from "@/lib/utils";

export const SurahSkeleton = ({ align = "vertical", length = 3 }: { align?: "vertical" | "horizonal"; length?: number }) => {
    return (
        <div className={cn("grid gap-3", align == "vertical" ? "grid-cols-3" : "grid-cols-1")}>
            {Array.from({ length }, (_, i) => (
                <div className="animate-pulse space-y-3" key={i}>
                    <div className="flex items-start justify-between gap-4 rounded-lg bg-gray-200 p-8 dark:bg-neutral-800">
                        <div className="h-10 w-10 rounded bg-neutral-300 dark:bg-neutral-700" />
                        <div className="w-full space-y-2">
                            <div className="h-6 w-full rounded bg-neutral-300 dark:bg-neutral-700" />
                            <div className="h-4 w-full rounded bg-neutral-300 dark:bg-neutral-700" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
