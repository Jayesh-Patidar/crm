import { Brand } from '@app/shared';
import { RepositoryContract } from '@app/server/core';
import { IBrandsForDropdown } from '../../interfaces';

export interface BrandRepositoryContract extends RepositoryContract<Brand> {
    getBrandsForDropdown(inputs: IBrandsForDropdown): Promise<Brand[]>;
}
