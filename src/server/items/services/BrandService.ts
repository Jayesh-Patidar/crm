import { Brand, Pagination } from '@app/shared';
import { GetRecordValidator, Validator } from '@app/server/core';
import { Inject, Injectable } from '@nestjs/common';
import { BRAND_REPOSITORY } from '../constants';
import { IGetBrands, ICreateBrand } from '../interfaces';
import type { BrandRepositoryContract } from '../repositories';
import type { BrandServiceContract } from './contracts';
import { CreateBrandValidator } from '../validators';

@Injectable()
export class BrandService implements BrandServiceContract {
    constructor(
        private validator: Validator,
        @Inject(BRAND_REPOSITORY)
        private brandRepository: BrandRepositoryContract,
    ) {}

    async getBrands(inputs: IGetBrands): Promise<Pagination<Brand>> {
        await this.validator.validate(inputs, GetRecordValidator);

        return this.brandRepository.getBrands(inputs);
    }

    async createBrand(inputs: ICreateBrand): Promise<Brand> {
        await this.validator.validate(inputs, CreateBrandValidator);

        return this.brandRepository.firstOrCreate(inputs);
    }
}
