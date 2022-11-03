import type { Request, Response } from '@app/server/core';
import { ApiController } from '@app/server/core';
import { LOCALITY_SERVICE } from '../constants';
import type { LocalityServiceContract } from '../services';
import { Controller, Get, Post, Inject, Req, Res } from '@nestjs/common';
import { ICreateLocality, IGetLocalities } from '../interfaces';

@Controller('locality')
export class LocalityController extends ApiController {
    constructor(
        @Inject(LOCALITY_SERVICE)
        private localityService: LocalityServiceContract,
    ) {
        super();
    }

    @Get('')
    async getLocalitys(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<IGetLocalities>();

        const localities = await this.localityService.getLocalities(inputs);

        return res.success(localities);
    }

    @Post('')
    async createLocality(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<ICreateLocality>();

        await this.localityService.createLocality(inputs);

        return res.noContent();
    }
}
