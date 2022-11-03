import { Model } from '@app/server/core';
import { AnyQueryBuilder, Modifiers } from 'objection';

export class Accessory extends Model {
    static tableName = 'accessories';

    static modifiers: Modifiers<AnyQueryBuilder> = {
        defaultSelects(query) {
            query.select('accessories.id', 'accessories.accessoryName');
        },

        searchAccessories(query, searchValue: string) {
            if (searchValue) {
                query.where(
                    'accessories.accessoryName',
                    'like',
                    `%${searchValue}%`,
                );
            }
        },
    };
}
