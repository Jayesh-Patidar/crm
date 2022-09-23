import { DatabaseRepository, InjectModel } from '@app/server/core';
import { Issue as IIssue } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { IIssuesForDropdown } from '../../interfaces';
import { Issue } from '../../models';
import { IssueRepositoryContract } from '../contracts';

@Injectable()
export class IssueRepositoryDatabase
    extends DatabaseRepository<IIssue>
    implements IssueRepositoryContract
{
    @InjectModel(Issue)
    model: Issue;

    async getIssuesForDropdown(inputs: IIssuesForDropdown): Promise<IIssue[]> {
        const { searchValue } = inputs;
        return this.query()
            .modify((query) => {
                if (searchValue) {
                    query.where('issue', 'like', `%${searchValue}%`);
                }
            })
            .limit(10);
    }
}
