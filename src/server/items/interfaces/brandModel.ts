export interface IGetBrandModels {
    brandId?: number;
    searchValue?: string;
    page?: number;
    limit?: number;
}

export interface ICreateBrandModel {
    brandId: number;
    modelName: string;
}
