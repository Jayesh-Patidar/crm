import { RepositoryContract } from '@app/server/core';
import { Issue, Pagination } from '@app/shared';
import { IGetIssues } from '../../interfaces';

export interface IssueRepositoryContract extends RepositoryContract<Issue> {
    getIssues(inputs: IGetIssues): Promise<Pagination<Issue>>;
}
