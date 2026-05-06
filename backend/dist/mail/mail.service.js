"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
const config_1 = require("@nestjs/config");
let MailService = MailService_1 = class MailService {
    configService;
    transporter;
    logger = new common_1.Logger(MailService_1.name);
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('SMTP_HOST'),
            port: this.configService.get('SMTP_PORT'),
            secure: false,
            auth: {
                user: this.configService.get('SMTP_USER'),
                pass: this.configService.get('SMTP_PASS'),
            },
        });
    }
    async sendWelcomeEmail(to, name, tempPassword) {
        const frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:3000';
        const loginUrl = `${frontendUrl}/login`;
        const systemName = 'CleanAir System';
        const mailOptions = {
            from: `"${systemName}" <${this.configService.get('MAIL_FROM')}>`,
            to,
            subject: `Welcome to ${systemName} - Your Account is Ready`,
            text: `Hi ${name},\n\nYour account has been created on ${systemName}.\n\nHere are your login credentials:\n  Email:              ${to}\n  Temporary Password: ${tempPassword}\n\n👉 Login here: ${loginUrl}\n\nFor security, you will be asked to reset your password on your first login.\n\nIf you did not expect this email, please ignore it.\n\n— The ${systemName} Team`,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Welcome email sent to ${to}`);
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${to}: ${error.message}`);
            throw error;
        }
    }
    async sendResetPasswordEmail(to, name, resetToken) {
        const frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:3000';
        const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(to)}`;
        const systemName = 'CleanAir System';
        const mailOptions = {
            from: `"${systemName}" <${this.configService.get('MAIL_FROM')}>`,
            to,
            subject: `Reset Your Password - ${systemName}`,
            text: `Hi ${name},\n\nYou requested to reset your password for ${systemName}.\n\n👉 Click the link below to set a new password:\n${resetUrl}\n\nThis link will expire in 1 hour.\n\nIf you did not request this, please ignore this email.\n\n— The ${systemName} Team`,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Reset password email sent to ${to}`);
        }
        catch (error) {
            this.logger.error(`Failed to send reset email to ${to}: ${error.message}`);
            throw error;
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map