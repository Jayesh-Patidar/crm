export interface ICreateRepairingRecord {
    customerId?: number;
    customerPhone?: string;
    customerFirstName?: string;
    customerLastName?: string;
    brandId: number;
    brandModelId: number;
    issueIds: number[];
    expectedReturnDate: Date;
    expectedRepairingCost: number;
}

export interface IGetRepairingRecords {
    limit: number;
    page: number;
    searchValue: string;
}

export interface IUpdateRepairingRecord {
    repairingId: number;
    status: number;
    actualRepairingCost: number;
}
