import { Model } from '@app/server/core';
import { Modifiers, AnyQueryBuilder } from 'objection';

export class Locality extends Model {
    static tableName = 'localities';

    static modifiers: Modifiers<AnyQueryBuilder> = {
        defaultSelects(query) {
            query.select('localities.id', 'localities.localityName');
        },

        searchLocalities(query, searchValue: string) {
            if (searchValue) {
                query.where(
                    'localities.localityName',
                    'like',
                    `%${searchValue}%`,
                );
            }
        },
    };
}
