import { Model } from '@app/server/core';
import { AnyQueryBuilder, Modifiers } from 'objection';

export class BrandModel extends Model {
    static tableName: string = 'brand_models';

    static modifiers: Modifiers<AnyQueryBuilder> = {
        defaultSelects(query) {
            query.select('id', 'brand_id', 'model_name');
        },
    };
}
