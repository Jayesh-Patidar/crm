import type { Request, Response } from '@app/server/core';
import { ApiController } from '@app/server/core';
import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { BRANDS_SERVICE } from '../constants';
import { IBrandsForDropdown } from '../interfaces';
import type { BrandServiceContract } from '../services';

@Controller('brand')
export class BrandController extends ApiController {
    constructor(
        @Inject(BRANDS_SERVICE)
        private brandService: BrandServiceContract,
    ) {
        super();
    }

    @Get('')
    async getBrandsForDropdown(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<IBrandsForDropdown>();

        const brands = await this.brandService.brandsForDropdown(inputs);

        return res.success(brands);
    }
}
