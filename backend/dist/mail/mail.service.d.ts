import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private configService;
    private transporter;
    private readonly logger;
    constructor(configService: ConfigService);
    sendWelcomeEmail(to: string, name: string, tempPassword: string): Promise<void>;
    sendResetPasswordEmail(to: string, name: string, resetToken: string): Promise<void>;
}
