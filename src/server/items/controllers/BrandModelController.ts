import { ApiController } from '@app/server/core';
import { BRAND_MODELS_SERVICE } from '../constants';
import type { BrandModelServiceContract } from '../services';
import type { Request, Response } from '@app/server/core';
import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { IBrandModelForDropdown } from '../interfaces';

@Controller('brand-model')
export class BrandModelController extends ApiController {
    constructor(
        @Inject(BRAND_MODELS_SERVICE)
        private brandModelService: BrandModelServiceContract,
    ) {
        super();
    }

    @Get('')
    async getBrandModelsForDropdown(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<IBrandModelForDropdown>();

        const brands = await this.brandModelService.brandModelsForDropdown(
            inputs,
        );

        return res.success(brands);
    }
}
