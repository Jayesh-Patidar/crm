import { Issue } from '@app/shared';
import { IIssuesForDropdown } from '../../interfaces';

export interface IssueServiceContract {
    issuesForDropdown(inputs: IIssuesForDropdown): Promise<Issue[]>;
}
