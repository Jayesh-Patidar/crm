import { RepositoryContract } from '@app/server/core';
import { Issue } from '@app/shared';
import { IIssuesForDropdown } from '../../interfaces';

export interface IssueRepositoryContract extends RepositoryContract<Issue> {
    getIssuesForDropdown(inputs: IIssuesForDropdown): Promise<Issue[]>;
}
