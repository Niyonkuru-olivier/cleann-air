export declare class LoginDto {
    email: string;
    password: string;
}
export declare class ResetPasswordDto {
    email: string;
    newPassword: string;
    token?: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
