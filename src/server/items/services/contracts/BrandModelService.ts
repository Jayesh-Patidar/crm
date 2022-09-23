import { BrandModel } from '@app/shared';
import { IBrandModelForDropdown } from '../../interfaces';

export interface BrandModelServiceContract {
    brandModelsForDropdown(
        inputs: IBrandModelForDropdown,
    ): Promise<BrandModel[]>;
}
