import { BRAND_MODELS_SERVICE } from '../constants';
import { BrandModelServiceContract } from '../services';
import { ApiController, Request, Response } from '@app/server/core';
import { Controller, Get, Inject, Req, Res } from '@nestjs/common';

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
        const inputs = req.all();

        const brands = await this.brandModelService.brandModelsForDropdown({
            brandId: +inputs.brandId,
            searchValue: inputs.searchValue,
        });

        return res.success(brands);
    }
}
