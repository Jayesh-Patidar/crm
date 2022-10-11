import { BrandModel } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { BRAND_MODELS_REPOSITORY } from '../constants';
import type { BrandModelServiceContract } from './contracts';
import { IBrandModelForDropdown } from '../interfaces';
import type { BrandModelRepositoryContract } from '../repositories';

@Injectable()
export class BrandModelService implements BrandModelServiceContract {
    constructor(
        @Inject(BRAND_MODELS_REPOSITORY)
        private brandModelRepository: BrandModelRepositoryContract,
    ) {}

    async brandModelsForDropdown(
        inputs: IBrandModelForDropdown,
    ): Promise<BrandModel[]> {
        return this.brandModelRepository.getBrandModelsForDropdown(inputs);
    }
}
