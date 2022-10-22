import { Issue, Pagination } from '@app/shared';
import { ICreateIssue, IGetIssues } from '../../interfaces';

export interface IssueServiceContract {
    getIssues(inputs: IGetIssues): Promise<Pagination<Issue>>;
    createIssue(inputs: ICreateIssue): Promise<Issue>;
}
