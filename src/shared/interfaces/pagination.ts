export interface Pagination<T> {
    records: T[];
    pagination?: {
        previousPage: number | null;
        currentPage: number;
        nextPage: number | null;
        totalPages: number;
        limit: number;
        total: number;
    };
}
