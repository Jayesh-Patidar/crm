import { Brand, Pagination } from '@app/shared';
import { RepositoryContract } from '@app/server/core';
import { IGetBrands } from '../../interfaces';

export interface BrandRepositoryContract extends RepositoryContract<Brand> {
    getBrands(inputs: IGetBrands): Promise<Pagination<Brand>>;
}
