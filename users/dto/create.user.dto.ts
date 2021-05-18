export interface CreateUserDto {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    permissionLevel: number;
}
