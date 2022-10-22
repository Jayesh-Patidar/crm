import { Brand, BrandModel, Customer, Issue } from '@app/shared';

export interface IGetRepairing {
    searchValue?: string;
    page?: number;
    limit?: number;
}

export interface ICreateRepairing {
    customer: Customer;
    brand: Brand;
    brandModel: BrandModel;
    issues: Issue[];
    serialNumber?: string;
    expectedReturnDate: Date;
    expectedRepairingCost: number;
}

export interface IUpdateRepairing {
    repairingId: number;
    status: number;
    actualRepairingCost: number;
}
