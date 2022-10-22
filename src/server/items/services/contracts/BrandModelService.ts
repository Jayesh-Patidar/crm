import { BrandModel, Pagination } from '@app/shared';
import { ICreateBrandModel, IGetBrandModels } from '../../interfaces';

export interface BrandModelServiceContract {
    getBrandModels(inputs: IGetBrandModels): Promise<Pagination<BrandModel>>;
    createBrandModel(inputs: ICreateBrandModel): Promise<BrandModel>;
}
