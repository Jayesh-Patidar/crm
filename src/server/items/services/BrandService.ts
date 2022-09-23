import { Brand } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { BRANDS_REPOSITORY } from '../constants';
import { IBrandsForDropdown } from '../interfaces';
import { BrandRepositoryContract } from '../repositories';
import { BrandServiceContract } from './contracts';

@Injectable()
export class BrandService implements BrandServiceContract {
    constructor(
        @Inject(BRANDS_REPOSITORY)
        private brandRepository: BrandRepositoryContract,
    ) {}

    async brandsForDropdown(inputs: IBrandsForDropdown): Promise<Brand[]> {
        return this.brandRepository.getBrandsForDropdown(inputs);
    }
}
