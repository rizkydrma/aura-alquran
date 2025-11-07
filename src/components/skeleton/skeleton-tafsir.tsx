import { Skeleton } from "../ui/skeleton";

export const TafsirSkeleton = () => {
    return (
        <div className="space-y-5 rounded-xl p-6 shadow-md">
            <div className="flex w-full justify-end">
                <Skeleton className="h-10 w-[80%] rounded-md bg-neutral-700 text-right" />
            </div>
            <div className="space-y-1">
                <Skeleton className="h-8 w-20 rounded-md bg-neutral-700" />
                <Skeleton className="h-6 w-full rounded-md bg-neutral-700" />
                <Skeleton className="h-6 w-full rounded-md bg-neutral-700" />
                <Skeleton className="h-6 w-full rounded-md bg-neutral-700" />
            </div>
            <div className="space-y-1">
                <Skeleton className="h-8 w-20 rounded-md bg-neutral-700" />
                <Skeleton className="h-6 w-full rounded-md bg-neutral-700" />
                <Skeleton className="h-6 w-full rounded-md bg-neutral-700" />
                <Skeleton className="h-6 w-full rounded-md bg-neutral-700" />
            </div>
        </div>
    );
};
