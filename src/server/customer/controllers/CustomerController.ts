import type { Request, Response } from '@app/server/core';
import { ApiController } from '@app/server/core';
import { CUSTOMER_SERVICE } from '../constants';
import type { CustomerServiceContract } from '../services';
import { Controller, Get, Post, Inject, Req, Res } from '@nestjs/common';
import { ICreateCustomer, IGetCustomers } from '../interfaces';

@Controller('customer')
export class CustomerController extends ApiController {
    constructor(
        @Inject(CUSTOMER_SERVICE)
        private customerService: CustomerServiceContract,
    ) {
        super();
    }

    @Get('')
    async getCustomers(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<IGetCustomers>();

        const customers = await this.customerService.getCustomers(inputs);

        return res.success(customers);
    }

    @Post('')
    async createCustomer(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<ICreateCustomer>();

        await this.customerService.createCustomer(inputs);

        return res.noContent();
    }
}
