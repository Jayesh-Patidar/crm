export interface User {
    id: number;
    firstName: string;
    lastName: string | null;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    phone: string;
    role: number;
    accessToken: string;
}
