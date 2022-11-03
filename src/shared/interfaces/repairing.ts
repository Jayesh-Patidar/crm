import { Issue } from './issue';
import { Brand } from './brand';
import { Customer } from './customer';
import { BrandModel } from './brandModel';
import { Locality } from './locality';

export interface Repairing {
    id: number;
    customerId: number;
    brandId: number;
    brandModelId: number;
    localityId: number;
    pointOfContactName?: string;
    pointOfContactPhone?: string;
    serialNumber: string | null;
    includedAccessories: string[];
    additionalInformation: string;
    status: number;
    expectedRepairingCost: string | number;
    actualRepairingCost: string | number | null;
    expectedReturnDate: string;
    actualReturnDate: string | null;
    isPinned: boolean | number;
    remarks?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: null;
}

export interface RepairingDetails extends Repairing {
    customer: Customer;
    locality: Locality;
    brand: Brand;
    brandModel: BrandModel;
    issues: Issue[];
}
