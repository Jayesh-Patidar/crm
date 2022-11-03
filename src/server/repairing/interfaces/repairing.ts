import {
    Accessory,
    Brand,
    BrandModel,
    Customer,
    Issue,
    Locality,
} from '@app/shared';

export interface IGetRepairing {
    searchValue?: string;
    status?: number;
    page?: number;
    limit?: number;
}

export interface IGetRepairingDetails {
    id: number;
}

export interface ICreateRepairing {
    customer: Customer;
    locality: Locality;
    brand: Brand;
    brandModel: BrandModel;
    issues: Issue[];
    accessories?: Accessory[];
    pointOfContactName?: string;
    pointOfContactPhone?: string;
    serialNumber?: string;
    additionalInformation?: string;
    expectedReturnDate: Date;
    expectedRepairingCost: number;
}

export interface IUpdateRepairing {
    id: number;
    status: number;
    actualRepairingCost: number | null;
    isPinned: boolean | null;
    remarks: string | null;
}
