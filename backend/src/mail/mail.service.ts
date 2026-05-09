import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendWelcomeEmail(to: string, name: string, tempPassword: string) {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
    const loginUrl = `${frontendUrl}/login`;
    const systemName = 'CleanAir System';

    const mailOptions = {
      from: `"${systemName}" <${this.configService.get<string>('SMTP_USER')}>`,
      to,
      subject: `Welcome to ${systemName} - Account Invitation`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
          <h2 style="color: #4f46e5;">Welcome to ${systemName}!</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>We are delighted to have you join us. Your account has been successfully created by the administrator.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p><strong>Your Account Credentials:</strong></p>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Full Name:</strong> ${name}</li>
            <li><strong>Email Address:</strong> ${to}</li>
            <li><strong>Temporary Password:</strong> <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">${tempPassword}</code></li>
          </ul>
          <p style="margin-top: 20px;">
            <a href="${frontendUrl}/reset-password?email=${encodeURIComponent(to)}" 
               style="background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Reset Password & Log In
            </a>
          </p>
          <p style="font-size: 12px; color: #64748b; margin-top: 30px;">
            For security reasons, you will be required to change your temporary password upon your first access. 
            If you did not expect this invitation, please ignore this email.
          </p>
          <p style="font-size: 14px; color: #475569; margin-top: 20px;">Best regards,<br/>The ${systemName} Team</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Welcome email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}: ${(error as Error).message}`);
      throw error;
    }
  }

  async sendResetPasswordEmail(to: string, name: string, resetToken: string) {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(to)}`;
    const systemName = 'CleanAir System';

    const mailOptions = {
      from: `"${systemName}" <${this.configService.get<string>('MAIL_FROM')}>`,
      to,
      subject: `Reset Your Password - ${systemName}`,
      text: `Hi ${name},\n\nYou requested to reset your password for ${systemName}.\n\n👉 Click the link below to set a new password:\n${resetUrl}\n\nThis link will expire in 1 hour.\n\nIf you did not request this, please ignore this email.\n\n— The ${systemName} Team`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Reset password email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send reset email to ${to}: ${(error as Error).message}`);
      throw error;
    }
  }
  async sendAccountUpdateNotification(to: string, name: string, changes: string[]) {
    const systemName = 'CleanAir System';
    const changesList = changes.map(c => `<li>• ${c}</li>`).join('');

    const mailOptions = {
      from: `"${systemName}" <${this.configService.get<string>('SMTP_USER')}>`,
      to,
      subject: `Account Updated - ${systemName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #4f46e5;">Account Information Updated</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>This is to inform you that your account information has been updated by an administrator.</p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin-top: 0; font-weight: bold; color: #475569;">Applicable Changes:</p>
            <ul style="list-style: none; padding: 0; margin: 0; color: #64748b;">
              ${changesList}
            </ul>
          </div>
          <p>If you have any questions regarding these changes, please contact your system administrator.</p>
          <p style="font-size: 14px; color: #475569; margin-top: 20px;">Best regards,<br/>The ${systemName} Team</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Account update notification sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send update notification to ${to}: ${(error as Error).message}`);
    }
  }
}
