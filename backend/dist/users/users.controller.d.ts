import { UsersService } from './users.service';
export declare enum UserRole {
    ADMIN = "ADMIN",
    OPERATOR = "OPERATOR",
    VIEWER = "VIEWER"
}
export declare enum UserStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    SUSPENDED = "SUSPENDED"
}
export declare class CreateUserDto {
    name: string;
    email: string;
    role: UserRole;
}
export declare class UpdateUserDto {
    name?: string;
    email?: string;
    role?: UserRole;
    status?: UserStatus;
    phone?: string;
    password?: string;
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<{
        message: string;
        user: {
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            status: import(".prisma/client").$Enums.UserStatus;
            phone: string | null;
            id: string;
            avatar: string | null;
            lastLogin: Date | null;
            joinedAt: Date;
            isTemporaryPassword: boolean;
            passwordResetToken: string | null;
            passwordResetExpires: Date | null;
        };
    }>;
    findAllUsers(): Promise<{
        assignedDevices: string[];
        userDevices: {
            userId: string;
            deviceId: string;
        }[];
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        status: import(".prisma/client").$Enums.UserStatus;
        phone: string | null;
        id: string;
        avatar: string | null;
        lastLogin: Date | null;
        joinedAt: Date;
        isTemporaryPassword: boolean;
        passwordResetToken: string | null;
        passwordResetExpires: Date | null;
    }[]>;
    findUserById(id: string): Promise<{
        assignedDevices: string[];
        userDevices: {
            userId: string;
            deviceId: string;
        }[];
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        status: import(".prisma/client").$Enums.UserStatus;
        phone: string | null;
        id: string;
        avatar: string | null;
        lastLogin: Date | null;
        joinedAt: Date;
        isTemporaryPassword: boolean;
        passwordResetToken: string | null;
        passwordResetExpires: Date | null;
    }>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        status: import(".prisma/client").$Enums.UserStatus;
        phone: string | null;
        id: string;
        avatar: string | null;
        lastLogin: Date | null;
        joinedAt: Date;
        isTemporaryPassword: boolean;
        passwordResetToken: string | null;
        passwordResetExpires: Date | null;
    }>;
    deleteUser(id: string): Promise<{
        success: boolean;
    }>;
}
