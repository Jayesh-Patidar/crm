export interface IGetLocalities {
    searchValue?: string;
    page?: number;
    limit?: number;
}

export interface ICreateLocality {
    localityName: string;
}
