import { Brand } from '@app/shared';
import { IBrandsForDropdown } from '../../interfaces';

export interface BrandServiceContract {
    brandsForDropdown(inputs: IBrandsForDropdown): Promise<Brand[]>;
}
