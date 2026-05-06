import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
export declare class AuthService {
    private readonly prisma;
    private readonly mailService;
    constructor(prisma: PrismaService, mailService: MailService);
    login(emailInput: string, pass: string): Promise<{
        requiresReset: boolean;
        message: string;
        email: string;
        user?: undefined;
    } | {
        message: string;
        user: {
            id: string;
            email: string;
            name: string;
            phone: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            status: import(".prisma/client").$Enums.UserStatus;
            avatar: string | null;
            lastLogin: Date | null;
            joinedAt: Date;
            isTemporaryPassword: boolean;
            passwordResetToken: string | null;
            passwordResetExpires: Date | null;
        };
        requiresReset?: undefined;
        email?: undefined;
    }>;
    resetPassword(emailInput: string, newPassword: string, token?: string): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            name: string;
            phone: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            status: import(".prisma/client").$Enums.UserStatus;
            avatar: string | null;
            lastLogin: Date | null;
            joinedAt: Date;
            isTemporaryPassword: boolean;
            passwordResetToken: string | null;
            passwordResetExpires: Date | null;
        };
    }>;
    forgotPassword(emailInput: string): Promise<{
        message: string;
    }>;
}
