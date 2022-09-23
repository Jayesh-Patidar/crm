import { Issue } from '@app/shared';
import { ISSUES_REPOSITORY } from '../constants';
import { IssueServiceContract } from './contracts';
import { IIssuesForDropdown } from '../interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { IssueRepositoryContract } from '../repositories';

@Injectable()
export class IssueService implements IssueServiceContract {
    constructor(
        @Inject(ISSUES_REPOSITORY)
        private issueRepository: IssueRepositoryContract,
    ) {}

    async issuesForDropdown(inputs: IIssuesForDropdown): Promise<Issue[]> {
        return this.issueRepository.getIssuesForDropdown(inputs);
    }
}
