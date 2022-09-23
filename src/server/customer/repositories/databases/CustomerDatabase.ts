import { Customer } from '../../models';
import { Injectable } from '@nestjs/common';
import { Customer as ICustomer } from '@app/shared';
import { ICustomerForDropdown } from '../../interfaces';
import { CustomerRepositoryContract } from '../contracts';
import { DatabaseRepository, InjectModel } from '@app/server/core';

@Injectable()
export class CustomerRepositoryDatabase
    extends DatabaseRepository<ICustomer>
    implements CustomerRepositoryContract
{
    @InjectModel(Customer)
    model: Customer;

    async getCustomerForDropdown(
        inputs: ICustomerForDropdown,
    ): Promise<ICustomer[]> {
        const { searchValue } = inputs;
        return this.query()
            .modify((query) => {
                if (searchValue) {
                    query.where('phone', 'like', `%${searchValue}%`);
                }
            })
            .limit(10);
    }
}
