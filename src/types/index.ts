export interface IPagination {
    page: number;
    limit: number;
    total_items: number;
    total_page: number;
}

export interface IPaginationResponse<T> {
    data: T[];
    meta: IPagination;
}
