import { AuthService } from './auth.service';
import { LoginDto, ResetPasswordDto, ForgotPasswordDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
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
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
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
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
}
