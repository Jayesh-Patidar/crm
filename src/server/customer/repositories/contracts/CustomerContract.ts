import { Customer } from '@app/shared';
import { RepositoryContract } from '@app/server/core';
import { ICustomerForDropdown } from '../../interfaces';

export interface CustomerRepositoryContract
    extends RepositoryContract<Customer> {
    getCustomerForDropdown(inputs: ICustomerForDropdown): Promise<Customer[]>;
}
