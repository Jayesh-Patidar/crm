import type { Request, Response } from '@app/server/core';
import { ApiController } from '@app/server/core';
import { Controller, Get, Post, Inject, Req, Res } from '@nestjs/common';
import { ACCESSORY_SERVICE } from '../constants';
import { ICreateAccessory, IGetAccessories } from '../interfaces';
import type { AccessoryServiceContract } from '../services';

@Controller('accessory')
export class AccessoryController extends ApiController {
    constructor(
        @Inject(ACCESSORY_SERVICE)
        private accessoryService: AccessoryServiceContract,
    ) {
        super();
    }

    @Get('')
    async getAccessories(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<IGetAccessories>();

        const accessories = await this.accessoryService.getAccessories(inputs);

        return res.success(accessories);
    }

    @Post('')
    async createAccessory(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<ICreateAccessory>();

        await this.accessoryService.createAccessory(inputs);

        return res.noContent();
    }
}
