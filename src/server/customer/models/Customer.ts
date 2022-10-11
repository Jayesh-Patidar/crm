import { Model } from '@app/server/core';
import { Modifiers, AnyQueryBuilder } from 'objection';

export class Customer extends Model {
    static tableName = 'customers';

    static modifiers: Modifiers<AnyQueryBuilder> = {
        defaultSelects(query) {
            query.select('id', 'first_name', 'last_name', 'phone');
        },
    };
}
