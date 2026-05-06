import { Controller, Post, Body, ValidationPipe, UsePipes, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, ResetPasswordDto, ForgotPasswordDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto.email, resetPasswordDto.newPassword, resetPasswordDto.token);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }
}
