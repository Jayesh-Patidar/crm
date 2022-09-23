import { REPAIRING_SERVICE } from '../constants';
import { ApiController } from '@app/server/core';
import { Request, Response } from '@app/server/core';
import { RepairingServiceContract } from '../services';
import { ICreateRepairingRecord, IGetRepairingRecords } from '../interfaces';
import { Controller, Get, Post, Inject, Req, Res } from '@nestjs/common';

@Controller('repairing')
export class RepairingController extends ApiController {
    constructor(
        @Inject(REPAIRING_SERVICE)
        private repairingService: RepairingServiceContract,
    ) {
        super();
    }

    @Get('')
    async getRepairingRecords(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<IGetRepairingRecords>();

        const repairingRecords =
            await this.repairingService.getRepairingRecords(inputs);
        return res.success(repairingRecords);
    }

    @Post('')
    async saveRepairingRecord(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<ICreateRepairingRecord>();

        await this.repairingService.saveRepairingRecord(inputs);

        return res.noContent();
    }
}
