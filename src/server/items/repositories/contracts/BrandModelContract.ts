import { BrandModel } from '@app/shared';
import { RepositoryContract } from '@app/server/core';
import { IBrandModelForDropdown } from '../../interfaces';

export interface BrandModelRepositoryContract
    extends RepositoryContract<BrandModel> {
    getBrandModelsForDropdown(
        inputs: IBrandModelForDropdown,
    ): Promise<BrandModel[]>;
}
