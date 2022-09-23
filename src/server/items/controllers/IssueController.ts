import { ISSUES_SERVICE } from '../constants';
import { IssueServiceContract } from '../services';
import { ApiController, Request, Response } from '@app/server/core';
import { Controller, Inject, Get, Req, Res } from '@nestjs/common';

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
        const inputs = req.all();

        const brands = await this.issueService.issuesForDropdown({
            searchValue: inputs.searchValue,
        });

        return res.success(brands);
    }
}
