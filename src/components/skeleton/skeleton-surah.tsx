export const SurahSkeleton = ({ count = 5 }: { count?: number }) => (
    <div className="animate-pulse space-y-3">
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl bg-gray-200 p-4 dark:bg-gray-700">
                <div className="space-y-2">
                    <div className="h-4 w-40 rounded bg-gray-300 dark:bg-gray-600" />
                    <div className="h-3 w-32 rounded bg-gray-300 dark:bg-gray-600" />
                    <div className="h-3 w-24 rounded bg-gray-300 dark:bg-gray-600" />
                </div>
                <div className="h-6 w-6 rounded bg-gray-300 dark:bg-gray-600" />
            </div>
        ))}
    </div>
);
