import type { Request, Response } from '@app/server/core';
import { ApiController } from '@app/server/core';
import { Controller, Get, Post, Inject, Req, Res } from '@nestjs/common';
import { BRAND_SERVICE } from '../constants';
import { IGetBrands, ICreateBrand } from '../interfaces';
import type { BrandServiceContract } from '../services';

@Controller('brand')
export class BrandController extends ApiController {
    constructor(
        @Inject(BRAND_SERVICE)
        private brandService: BrandServiceContract,
    ) {
        super();
    }

    @Get('')
    async getBrands(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<IGetBrands>();

        const brands = await this.brandService.getBrands(inputs);

        return res.success(brands);
    }

    @Post('')
    async createBrand(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<ICreateBrand>();

        await this.brandService.createBrand(inputs);

        return res.noContent();
    }
}
