import { BrandModel, Pagination } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { BRAND_MODEL_REPOSITORY } from '../constants';
import type { BrandModelServiceContract } from './contracts';
import { ICreateBrandModel, IGetBrandModels } from '../interfaces';
import type { BrandModelRepositoryContract } from '../repositories';
import { Validator } from '@app/server/core';
import {
    CreateBrandModelValidator,
    GetBrandModelsValidator,
} from '../validators';

@Injectable()
export class BrandModelService implements BrandModelServiceContract {
    constructor(
        private validator: Validator,
        @Inject(BRAND_MODEL_REPOSITORY)
        private brandModelRepository: BrandModelRepositoryContract,
    ) {}

    async getBrandModels(
        inputs: IGetBrandModels,
    ): Promise<Pagination<BrandModel>> {
        await this.validator.validate(inputs, GetBrandModelsValidator);

        return this.brandModelRepository.getBrandModels(inputs);
    }

    async createBrandModel(inputs: ICreateBrandModel): Promise<BrandModel> {
        await this.validator.validate(inputs, CreateBrandModelValidator);

        return this.brandModelRepository.firstOrCreate(inputs);
    }
}
