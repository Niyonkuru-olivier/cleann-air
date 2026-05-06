import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreateUserDto, UpdateUserDto } from './users.controller';
export declare class UsersService {
    private readonly prisma;
    private readonly mailService;
    constructor(prisma: PrismaService, mailService: MailService);
    private generateTemporaryPassword;
    createUser(dto: CreateUserDto): Promise<{
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
    updateUser(id: string, dto: UpdateUserDto): Promise<{
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
