import { ISSUES_SERVICE } from '../constants';
import type { IssueServiceContract } from '../services';
import type { Request, Response } from '@app/server/core';
import { ApiController } from '@app/server/core';
import { Controller, Inject, Get, Req, Res } from '@nestjs/common';
import { IIssuesForDropdown } from '../interfaces';

@Controller('issue')
export class IssueController extends ApiController {
    constructor(
        @Inject(ISSUES_SERVICE)
        private issueService: IssueServiceContract,
    ) {
        super();
    }

    @Get()
    async getIssuesForDropdown(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<IIssuesForDropdown>();

        const brands = await this.issueService.issuesForDropdown(inputs);

        return res.success(brands);
    }
}
