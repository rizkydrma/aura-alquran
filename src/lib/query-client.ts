import { IPagination } from "@/types";
import { QueryClient } from "@tanstack/react-query";
import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60, // 1 menit
        },
    },
});

export const getNextPage = (meta: IPagination) => (meta.page < meta.total_page ? meta.page + 1 : undefined);

// Tipe untuk mendapatkan Return Type dari Promise/Async Function
export type AwaitedReturn<T> = T extends Promise<infer R> ? R : T;

// Tipe Bungkusan Custom Query Hook
// F: Tipe fungsi fetcher (misalnya: typeof getTafsirByAyat)
// TData: Tipe Data yang Diharapkan (hasil AwaitedReturn dari F)
export type CustomQueryOptions<F extends (...args: any) => any, TData = AwaitedReturn<ReturnType<F>>> = Omit<
    UseQueryOptions<TData, Error>,
    "queryKey" | "queryFn"
>;

// Tipe Bungkusan Custom Query Result
export type CustomQueryResult<F extends (...args: any) => any, TData = AwaitedReturn<ReturnType<F>>> = UseQueryResult<TData, Error>;
