import { BrandModel } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { BRAND_MODELS_REPOSITORY } from '../constants';
import { BrandModelServiceContract } from './contracts';
import { IBrandModelForDropdown } from '../interfaces';
import { BrandModelRepositoryContract } from '../repositories';

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
