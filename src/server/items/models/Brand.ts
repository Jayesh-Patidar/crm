import { Model } from '@app/server/core';
import { AnyQueryBuilder, Modifiers } from 'objection';

export class Brand extends Model {
    static tableName: string = 'brands';

    static modifiers: Modifiers<AnyQueryBuilder> = {
        defaultSelects(query) {
            query.select('id', 'brand_name');
        },
    };
}
