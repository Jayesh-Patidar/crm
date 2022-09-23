export interface ICreateCustomer {
    firstName: string;
    lastName?: string;
    phone: string;
}

export interface ICustomerForDropdown {
    searchValue: string | undefined;
}
