import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export const SkeletonDoa = ({ align = "horizontal", length = 3 }: { align?: "vertical" | "horizontal"; length?: number }) => {
    return (
        <div className={cn("grid gap-3", align == "horizontal" ? "grid-cols-3" : "grid-cols-1")}>
            {Array.from({ length }, (_, i) => (
                <div key={i} className="flex items-start justify-between rounded-lg bg-neutral-800 p-8">
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

export const SkeletonDoaSidebar = ({ align = "horizontal", length = 3 }: { align?: "vertical" | "horizontal"; length?: number }) => {
    return (
        <div className={cn("grid gap-3", align == "horizontal" ? "grid-cols-3" : "grid-cols-1")}>
            {Array.from({ length }, (_, i) => (
                <div className="animate-pulse space-y-3" key={i}>
                    <div className="flex items-start justify-between gap-4 rounded-lg bg-gray-200 p-4 dark:bg-neutral-800">
                        <div className="w-full space-y-2">
                            <div className="h-6 w-full rounded bg-neutral-300 dark:bg-neutral-700" />
                            <div className="h-4 w-full rounded bg-neutral-300 dark:bg-neutral-700" />
                        </div>
                        <div className="h-8 w-8 shrink-0 rounded bg-neutral-300 dark:bg-neutral-700" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export const SkeletonDoaInfo = () => {
    return (
        <div className="rounded-lg bg-neutral-800 p-6">
            <div className="flex w-full flex-col items-end justify-end gap-3 text-right">
                <Skeleton className="h-6 w-20 bg-neutral-300 dark:bg-neutral-700" />
                <Skeleton className="h-4 w-26 bg-neutral-300 dark:bg-neutral-700" />
            </div>
        </div>
    );
};

export const SkeletonDoaList = ({ length = 3 }: { length?: number }) => {
    return (
        <div className="grid grid-cols-1 gap-2">
            {Array.from({ length }, (_, i) => (
                <div key={i} className="flex items-start justify-between rounded-lg bg-gray-200 p-8 dark:bg-neutral-800">
                    <Skeleton className="h-10 w-10 rounded-lg bg-neutral-300 dark:bg-neutral-700" />

                    <div className="text-righ relative flex w-full flex-col items-end justify-end gap-2">
                        <Skeleton className="h-8 w-[60%] bg-neutral-300 dark:bg-neutral-700" />
                        <Skeleton className="h-5 w-[75%] bg-neutral-300 dark:bg-neutral-700" />
                        <Skeleton className="h-6 w-[85%] bg-neutral-300 dark:bg-neutral-700" />

                        <div className="mt-4 flex items-center gap-2">
                            <Skeleton className="h-8 w-8 shrink-0 bg-neutral-300 dark:bg-neutral-700" />
                            <Skeleton className="h-8 w-8 shrink-0 bg-neutral-300 dark:bg-neutral-700" />
                            <Skeleton className="h-8 w-8 shrink-0 bg-neutral-300 dark:bg-neutral-700" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
