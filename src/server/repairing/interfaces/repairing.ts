export interface ICreateRepairingRecord {
    customerId?: number;
    customerPhone?: string;
    customerFirstName?: string;
    customerLastName?: string;
    brandId: number;
    brandModelId: number;
    issueIds: number[];
}

export interface IGetRepairingRecords {
    limit: number;
    offset: number;
}
