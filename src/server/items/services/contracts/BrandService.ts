import { Brand, Pagination } from '@app/shared';
import { IGetBrands, ICreateBrand } from '../../interfaces';

export interface BrandServiceContract {
    getBrands(inputs: IGetBrands): Promise<Pagination<Brand>>;
    createBrand(inputs: ICreateBrand): Promise<Brand>;
}
