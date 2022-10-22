import { ISSUE_SERVICE } from '../constants';
import type { IssueServiceContract } from '../services';
import type { Request, Response } from '@app/server/core';
import { ApiController } from '@app/server/core';
import { Controller, Inject, Get, Req, Res } from '@nestjs/common';
import { IGetIssues } from '../interfaces';

@Controller('issue')
export class IssueController extends ApiController {
    constructor(
        @Inject(ISSUE_SERVICE)
        private issueService: IssueServiceContract,
    ) {
        super();
    }

    @Get('')
    async getIssues(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<IGetIssues>();

        const brands = await this.issueService.getIssues(inputs);

        return res.success(brands);
    }
}
