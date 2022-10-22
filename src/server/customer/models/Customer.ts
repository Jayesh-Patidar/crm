import { Model } from '@app/server/core';
import { Modifiers, AnyQueryBuilder } from 'objection';

export class Customer extends Model {
    static tableName = 'customers';

    static modifiers: Modifiers<AnyQueryBuilder> = {
        defaultSelects(query) {
            query.select(
                'customers.id',
                'customers.firstName',
                'customers.lastName',
                'customers.phone',
            );
        },

        searchCustomers(query, searchValue: string) {
            if (searchValue) {
                query
                    .where('customers.firstName', 'like', `%${searchValue}%`)
                    .orWhere('customers.lastName', 'like', `%${searchValue}%`)
                    .orWhere('customers.phone', 'like', `%${searchValue}%`);
            }
        },
    };
}
