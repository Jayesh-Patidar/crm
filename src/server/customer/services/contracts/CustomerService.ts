import { Customer, Pagination } from '@app/shared';
import { ICreateCustomer, IGetCustomers } from '../../interfaces';

export interface CustomerServiceContract {
    getCustomers(inputs: IGetCustomers): Promise<Pagination<Customer>>;
    createCustomer(inputs: ICreateCustomer): Promise<Customer>;
}
