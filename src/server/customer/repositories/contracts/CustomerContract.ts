import { Customer, Pagination } from '@app/shared';
import { RepositoryContract } from '@app/server/core';
import { IGetCustomers } from '../../interfaces';

export interface CustomerRepositoryContract
    extends RepositoryContract<Customer> {
    getCustomers(inputs: IGetCustomers): Promise<Pagination<Customer>>;
}
