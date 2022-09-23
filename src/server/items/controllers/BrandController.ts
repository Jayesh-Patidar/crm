import { Request, Response } from '@app/server/core';
import { ApiController } from '@app/server/core';
import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { BRANDS_SERVICE } from '../constants';
import { BrandServiceContract } from '../services';

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
        const inputs = req.all();

        const brands = await this.brandService.brandsForDropdown({
            searchValue: inputs.searchValue,
        });

        return res.success(brands);
    }
}
