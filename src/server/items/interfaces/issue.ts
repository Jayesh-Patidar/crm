export interface IGetIssues {
    searchValue?: string;
    page?: number;
    limit?: number;
}

export interface ICreateIssue {
    issue: string;
}
