export interface IGetIssues {
    searchValue?: string;
    page?: number;
    limit?: number;
}

export interface ICreateIssue {
    issue: string;
    issueType?: number;
    approximateTimeToFix?: number;
    isFixedTime?: number;
    approximateCostToFix?: number;
    isFixedCost?: number;
}
