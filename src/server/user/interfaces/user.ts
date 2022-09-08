export interface IUser {
    id: number;
    firstName: string;
    lastName: string | null;
    phone: string;
    role: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
