import { DatabaseRepository, InjectModel } from '@app/server/core';
import { Issue as IIssue, Pagination } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { IGetIssues } from '../../interfaces';
import { Issue } from '../../models';
import { IssueRepositoryContract } from '../contracts';

@Injectable()
export class IssueRepositoryDatabase
    extends DatabaseRepository<IIssue>
    implements IssueRepositoryContract
{
    @InjectModel(Issue)
    model: Issue;

    async getIssues(inputs: IGetIssues): Promise<Pagination<IIssue>> {
        const { searchValue, limit, page } = inputs;
        return this.query()
            .modify('searchIssues', searchValue)
            .paginate<IIssue>(page, limit);
    }
}
