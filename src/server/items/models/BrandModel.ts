import { Model } from '@app/server/core';
import { AnyQueryBuilder, Modifiers } from 'objection';

export class BrandModel extends Model {
    static tableName = 'brand_models';

    static modifiers: Modifiers<AnyQueryBuilder> = {
        defaultSelects(query) {
            query.select(
                'brand_models.id',
                'brand_models.brandId',
                'brand_models.modelName',
            );
        },

        searchBrandModels(query, searchValue?: string) {
            if (searchValue) {
                query.where(
                    'brand_models.modelName',
                    'like',
                    `%${searchValue}%`,
                );
            }
        },

        searchByBrandId(query, brandId?: number) {
            query.where('brandId', brandId || 0);
        },
    };
}
