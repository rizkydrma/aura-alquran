"use client";

import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export const AsmaulHusnaSkeleton = ({ align = "horizontal", length = 3 }: { align?: "vertical" | "horizontal"; length?: number }) => {
    return (
        <div className={cn("grid gap-3", align == "horizontal" ? "grid-cols-3" : "grid-cols-1")}>
            {Array.from({ length }, (_, i) => (
                <div key={i} className="flex items-start gap-4 rounded-lg bg-neutral-800 p-6">
                    <Skeleton className="h-10 w-10 shrink-0 rounded-lg bg-neutral-300 dark:bg-neutral-700" />
                    <div className="flex flex-col gap-3 text-left">
                        <Skeleton className="h-5 w-20 bg-neutral-300 dark:bg-neutral-700" />
                        <Skeleton className="h-4 w-18 bg-neutral-300 dark:bg-neutral-700" />
                        <Skeleton className="h-4 w-32 bg-neutral-300 dark:bg-neutral-700" />
                    </div>
                </div>
            ))}
        </div>
    );
};
