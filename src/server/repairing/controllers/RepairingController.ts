import { REPAIRING_SERVICE } from '../constants';
import { ApiController } from '@app/server/core';
import type { Request, Response } from '@app/server/core';
import type { RepairingServiceContract } from '../services';
import {
    ICreateRepairing,
    IGetRepairing,
    IGetRepairingDetails,
    IUpdateRepairing,
} from '../interfaces';
import { Controller, Get, Post, Patch, Inject, Req, Res } from '@nestjs/common';

@Controller('repairing')
export class RepairingController extends ApiController {
    constructor(
        @Inject(REPAIRING_SERVICE)
        private repairingService: RepairingServiceContract,
    ) {
        super();
    }

    @Get('')
    async getRepairing(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<IGetRepairing>();

        const repairing = await this.repairingService.getRepairing(inputs);

        return res.success(repairing);
    }

    @Get(':id')
    async getRepairingDetails(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<IGetRepairingDetails>();

        const repairingDetails =
            await this.repairingService.getRepairingDetails(inputs);

        return res.success(repairingDetails);
    }

    @Post('')
    async createRepairing(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<ICreateRepairing>();

        await this.repairingService.createRepairing(inputs);

        return res.noContent();
    }

    @Patch(':id')
    async updateRepairing(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<IUpdateRepairing>();

        await this.repairingService.updateRepairing(inputs);

        return res.noContent();
    }
}
