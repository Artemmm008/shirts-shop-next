export type UserRole = "client" | "admin";

export interface User {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt?: string;
    updatedAt?: string;
};