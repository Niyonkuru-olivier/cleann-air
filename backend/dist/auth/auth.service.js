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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcryptjs"));
const crypto = __importStar(require("crypto"));
const mail_service_1 = require("../mail/mail.service");
let AuthService = class AuthService {
    prisma;
    mailService;
    constructor(prisma, mailService) {
        this.prisma = prisma;
        this.mailService = mailService;
    }
    async login(emailInput, pass) {
        const email = emailInput.toLowerCase();
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email');
        }
        const isMatch = await bcrypt.compare(pass, user.passwordHash);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        const userStatus = user.status?.toString().toUpperCase();
        console.log(`Login attempt for ${email}: Status is ${userStatus}`);
        if (userStatus === 'SUSPENDED') {
            throw new common_1.UnauthorizedException('Login Failed, Your account is Suspended please contact the Admin of the system');
        }
        if (userStatus === 'INACTIVE') {
            throw new common_1.UnauthorizedException('Login Failed, Your account is Inactive please contact the Admin of the system');
        }
        if (userStatus !== 'ACTIVE') {
            throw new common_1.UnauthorizedException('Login Failed, Your account is not active please contact the Admin of the system');
        }
        if (user.isTemporaryPassword) {
            return {
                requiresReset: true,
                message: 'You must reset your password before continuing.',
                email: user.email,
            };
        }
        const { passwordHash: _, ...result } = user;
        await this.prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
        });
        return {
            message: 'Login successful',
            user: result,
        };
    }
    async resetPassword(emailInput, newPassword, token) {
        const email = emailInput.toLowerCase();
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        if (token) {
            if (user.passwordResetToken !== token || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
                throw new common_1.UnauthorizedException('Invalid or expired reset token');
            }
        }
        else if (!user.isTemporaryPassword) {
            throw new common_1.UnauthorizedException('Security token is required to reset password');
        }
        const userStatus = user.status?.toString().toUpperCase();
        console.log(`Password reset attempt for ${email}: Status is ${userStatus}`);
        if (userStatus === 'SUSPENDED') {
            throw new common_1.UnauthorizedException('Login Failed, Your account is Suspended please contact the Admin of the system');
        }
        if (userStatus === 'INACTIVE') {
            throw new common_1.UnauthorizedException('Login Failed, Your account is Inactive please contact the Admin of the system');
        }
        if (userStatus !== 'ACTIVE') {
            throw new common_1.UnauthorizedException('Login Failed, Your account is not active please contact the Admin of the system');
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newPassword, salt);
        const updatedUser = await this.prisma.user.update({
            where: { id: user.id },
            data: {
                passwordHash,
                isTemporaryPassword: false,
                passwordResetToken: null,
                passwordResetExpires: null,
                lastLogin: new Date(),
            },
        });
        const { passwordHash: _, ...result } = updatedUser;
        return {
            message: 'Password reset successful',
            user: result,
        };
    }
    async forgotPassword(emailInput) {
        const email = emailInput.toLowerCase();
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.BadRequestException('This email is not registered in our system');
        }
        const userStatus = user.status?.toString().toUpperCase();
        if (userStatus === 'SUSPENDED') {
            throw new common_1.UnauthorizedException('Your account is Suspended. Please contact the Admin of the system.');
        }
        if (userStatus === 'INACTIVE') {
            throw new common_1.UnauthorizedException('Your account is Inactive. Please contact the Admin of the system.');
        }
        if (userStatus !== 'ACTIVE') {
            throw new common_1.UnauthorizedException('Your account is not active. Please contact the Admin of the system.');
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const passwordResetExpires = new Date(Date.now() + 3600000);
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                passwordResetToken: resetToken,
                passwordResetExpires,
            },
        });
        await this.mailService.sendResetPasswordEmail(user.email, user.name, resetToken);
        return {
            message: 'Reset link sent successfully to your email!',
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map