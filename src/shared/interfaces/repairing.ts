import { Brand } from './brand';
import { BrandModel } from './brandModel';
import { Customer } from './customer';
import { Issue } from './issue';

export interface Repairing {
    id: number;
    customerId: number;
    brandId: number;
    brandModelId: number;
    status: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: null;
}

export interface RepairingRecord extends Repairing {
    customer: Customer;
    brand: Brand;
    brandModel: BrandModel;
    issues: Issue[];
}
