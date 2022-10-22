export interface Issue {
    id: number;
    issue: string;
    issueType: number | null;
    approximateTimeToFix: number | null;
    isFixedTime: number;
    approximateCostToFix: number | null;
    isFixedCost: number;
    createdAt: string | null;
    updatedAt: string | null;
    deletedAt: string | null;
}
