import { Injectable } from '@nestjs/common';
import { BrandModel } from '../../models';
import { BrandModel as IBrandModel, Pagination } from '@app/shared';
import { IGetBrandModels } from '../../interfaces';
import { BrandModelRepositoryContract } from '../contracts';
import { DatabaseRepository, InjectModel } from '@app/server/core';

@Injectable()
export class BrandModelRepositoryDatabase
    extends DatabaseRepository<IBrandModel>
    implements BrandModelRepositoryContract
{
    @InjectModel(BrandModel)
    model: BrandModel;

    async getBrandModels(
        inputs: IGetBrandModels,
    ): Promise<Pagination<IBrandModel>> {
        const { brandId, searchValue, page, limit } = inputs;
        return this.query()
            .modify('searchBrandModels', searchValue)
            .modify('searchByBrandId', brandId)
            .paginate<IBrandModel>(page, limit);
    }
}
