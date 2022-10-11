import { Model } from '@app/server/core';
import { AnyQueryBuilder, Modifiers } from 'objection';

export class Brand extends Model {
    static tableName = 'brands';

    static modifiers: Modifiers<AnyQueryBuilder> = {
        defaultSelects(query) {
            query.select('brands.id', 'brands.brandName');
        },
    };
}
