export interface Issue {
    id: number;
    issue: string;
    issueType: number;
    approximateTimeToFix: number;
    createdAt: string | null;
    updatedAt: string | null;
    deletedAt: string | null;
}
