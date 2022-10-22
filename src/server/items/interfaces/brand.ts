export interface IGetBrands {
    searchValue?: string;
    page?: number;
    limit?: number;
}

export interface ICreateBrand {
    brandName: string;
}
