import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export const HadisSourceSkeleton = ({ align = "horizontal", length = 3 }: { align?: "vertical" | "horizontal"; length?: number }) => {
    return (
        <div className={cn("grid gap-3", align == "horizontal" ? "grid-cols-3" : "grid-cols-1")}>
            {Array.from({ length }, (_, i) => (
                <div key={i} className="flex items-start justify-between rounded-lg bg-gray-200 p-8 dark:bg-neutral-800">
                    <div className="flex flex-col gap-3">
                        <Skeleton className="h-6 w-20 bg-neutral-300 dark:bg-neutral-700" />
                        <Skeleton className="h-5 w-26 bg-neutral-300 dark:bg-neutral-700" />
                    </div>

                    <Skeleton className="h-12 w-12 rounded-lg bg-neutral-300 dark:bg-neutral-700" />
                </div>
            ))}
        </div>
    );
};
