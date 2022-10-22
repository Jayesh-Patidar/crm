export interface IGetCustomers {
    searchValue?: string;
    page?: number;
    limit?: number;
}

export interface ICreateCustomer {
    firstName: string;
    lastName?: string;
    phone: string;
}
