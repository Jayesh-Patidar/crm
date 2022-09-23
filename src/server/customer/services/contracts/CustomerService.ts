import { Customer } from '@app/shared';
import { ICreateCustomer, ICustomerForDropdown } from '../../interfaces';

export interface CustomerServiceContract {
    createCustomer(inputs: ICreateCustomer): Promise<Customer>;
    customersForDropdown(inputs: ICustomerForDropdown): Promise<Customer[]>;
}
