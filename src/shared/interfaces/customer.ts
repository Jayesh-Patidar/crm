export interface Customer {
    id: number;
    firstName: string;
    lastName: string | null;
    phone: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
}
