import { Issue } from './issue';
import { Brand } from './brand';
import { Customer } from './customer';
import { BrandModel } from './brandModel';

export interface Repairing {
    id: number;
    generatedId: string;
    customerId: number;
    brandId: number;
    brandModelId: number;
    serialNumber: string | null;
    status: number;
    expectedRepairingCost: number;
    actualRepairingCost: number | null;
    expectedReturnDate: string;
    actualReturnDate: string | null;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: null;
}

export interface RepairingDetails extends Repairing {
    customer: Customer;
    brand: Brand;
    brandModel: BrandModel;
    issues: Issue[];
}
