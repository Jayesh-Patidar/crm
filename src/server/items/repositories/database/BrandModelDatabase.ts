import { Injectable } from '@nestjs/common';
import { BrandModel } from '../../models';
import { BrandModel as IBrandModel } from '@app/shared';
import { IBrandModelForDropdown } from '../../interfaces';
import { BrandModelRepositoryContract } from '../contracts';
import { DatabaseRepository, InjectModel } from '@app/server/core';

@Injectable()
export class BrandModelRepositoryDatabase
    extends DatabaseRepository<IBrandModel>
    implements BrandModelRepositoryContract
{
    @InjectModel(BrandModel)
    model: BrandModel;

    async getBrandModelsForDropdown(
        inputs: IBrandModelForDropdown,
    ): Promise<IBrandModel[]> {
        const { brandId, searchValue } = inputs;
        return this.query()
            .modify((query) => {
                if (searchValue) {
                    query.where('modelName', 'like', `%${searchValue}%`);
                }
            })
            .where('brandId', brandId)
            .limit(10);
    }
}
