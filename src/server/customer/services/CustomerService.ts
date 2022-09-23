import { Customer } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_REPOSITORY } from '../constants';
import { CustomerServiceContract } from './contracts';
import { ICreateCustomer, ICustomerForDropdown } from '../interfaces';
import { CustomerRepositoryContract } from '../repositories';
import { Validator } from '@app/server/core';
import { CreateCustomerRecordValidator } from '../validators';

@Injectable()
export class CustomerService implements CustomerServiceContract {
    constructor(
        private validator: Validator,
        @Inject(CUSTOMER_REPOSITORY)
        private customerRepository: CustomerRepositoryContract,
    ) {}

    async createCustomer(inputs: ICreateCustomer): Promise<Customer> {
        await this.validator.validate(inputs, CreateCustomerRecordValidator);

        return this.customerRepository.firstOrCreate(
            { phone: inputs.phone },
            inputs,
        );
    }

    async customersForDropdown(
        inputs: ICustomerForDropdown,
    ): Promise<Customer[]> {
        return this.customerRepository.getCustomerForDropdown(inputs);
    }
}
