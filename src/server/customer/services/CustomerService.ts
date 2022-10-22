import { Customer, Pagination } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_REPOSITORY } from '../constants';
import type { CustomerServiceContract } from './contracts';
import { ICreateCustomer, IGetCustomers } from '../interfaces';
import type { CustomerRepositoryContract } from '../repositories';
import { GetRecordValidator, Validator } from '@app/server/core';
import { CreateCustomerValidator } from '../validators';

@Injectable()
export class CustomerService implements CustomerServiceContract {
    constructor(
        private validator: Validator,
        @Inject(CUSTOMER_REPOSITORY)
        private customerRepository: CustomerRepositoryContract,
    ) {}

    async getCustomers(inputs: IGetCustomers): Promise<Pagination<Customer>> {
        await this.validator.validate(inputs, GetRecordValidator);

        return this.customerRepository.getCustomers(inputs);
    }

    async createCustomer(inputs: ICreateCustomer): Promise<Customer> {
        await this.validator.validate(inputs, CreateCustomerValidator);

        return this.customerRepository.firstOrCreate(
            { phone: inputs.phone },
            inputs,
        );
    }
}
