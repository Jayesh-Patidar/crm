import { Customer } from '../../models';
import { Injectable } from '@nestjs/common';
import { Customer as ICustomer, Pagination } from '@app/shared';
import { IGetCustomers } from '../../interfaces';
import { CustomerRepositoryContract } from '../contracts';
import { DatabaseRepository, InjectModel } from '@app/server/core';

@Injectable()
export class CustomerRepositoryDatabase
    extends DatabaseRepository<ICustomer>
    implements CustomerRepositoryContract
{
    @InjectModel(Customer)
    model: Customer;

    async getCustomers(inputs: IGetCustomers): Promise<Pagination<ICustomer>> {
        const { searchValue, page, limit } = inputs;
        return this.query()
            .modify('searchCustomers', searchValue)
            .paginate<ICustomer>(page, limit);
    }
}
