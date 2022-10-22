import { BrandModel, Pagination } from '@app/shared';
import { RepositoryContract } from '@app/server/core';
import { IGetBrandModels } from '../../interfaces';

export interface BrandModelRepositoryContract
    extends RepositoryContract<BrandModel> {
    getBrandModels(inputs: IGetBrandModels): Promise<Pagination<BrandModel>>;
}
