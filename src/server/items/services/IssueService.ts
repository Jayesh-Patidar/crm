import { Issue, Pagination } from '@app/shared';
import { ISSUE_REPOSITORY } from '../constants';
import { Inject, Injectable } from '@nestjs/common';
import { CreateIssueValidator } from '../validators';
import type { IssueServiceContract } from './contracts';
import { ICreateIssue, IGetIssues } from '../interfaces';
import type { IssueRepositoryContract } from '../repositories';
import { GetRecordValidator, Validator } from '@app/server/core';

@Injectable()
export class IssueService implements IssueServiceContract {
    constructor(
        private validator: Validator,
        @Inject(ISSUE_REPOSITORY)
        private issueRepository: IssueRepositoryContract,
    ) {}

    async getIssues(inputs: IGetIssues): Promise<Pagination<Issue>> {
        await this.validator.validate(inputs, GetRecordValidator);

        return this.issueRepository.getIssues(inputs);
    }

    async createIssue(inputs: ICreateIssue): Promise<Issue> {
        await this.validator.validate(inputs, CreateIssueValidator);

        const {
            issue,
            issueType,
            approximateTimeToFix,
            isFixedTime,
            approximateCostToFix,
            isFixedCost,
        } = inputs;

        return this.issueRepository.firstOrCreate(
            {
                issue,
            },
            {
                issueType,
                approximateTimeToFix,
                isFixedTime,
                approximateCostToFix,
                isFixedCost,
            },
        );
    }
}
