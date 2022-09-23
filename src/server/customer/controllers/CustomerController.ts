import { Request, Response } from '@app/server/core';
import { ApiController } from '@app/server/core';
import { CUSTOMER_SERVICE } from '../constants';
import { CustomerServiceContract } from '../services';
import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { ICustomerForDropdown } from '../interfaces';

@Controller('customer')
export class CustomerController extends ApiController {
    constructor(
        @Inject(CUSTOMER_SERVICE)
        private customerService: CustomerServiceContract,
    ) {
        super();
    }

    @Get('')
    async getCustomersForDropdown(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const inputs = req.all<ICustomerForDropdown>();

        const customers = await this.customerService.customersForDropdown(
            inputs,
        );

        return res.success(customers);
    }
}
