import { ApiController } from '@app/server/core';
import { BRAND_MODEL_SERVICE } from '../constants';
import type { BrandModelServiceContract } from '../services';
import type { Request, Response } from '@app/server/core';
import { Controller, Get, Post, Inject, Req, Res } from '@nestjs/common';
import { ICreateBrandModel, IGetBrandModels } from '../interfaces';

@Controller('brand-model')
export class BrandModelController extends ApiController {
    constructor(
        @Inject(BRAND_MODEL_SERVICE)
        private brandModelService: BrandModelServiceContract,
    ) {
        super();
    }

    @Get('')
    async getBrandModels(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<IGetBrandModels>();

        const brands = await this.brandModelService.getBrandModels(inputs);

        return res.success(brands);
    }

    @Post('')
    async createBrandModel(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<ICreateBrandModel>();

        await this.brandModelService.createBrandModel(inputs);

        return res.noContent();
    }
}
