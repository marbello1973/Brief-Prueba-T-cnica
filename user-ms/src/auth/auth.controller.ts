import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @MessagePattern({ cmd: 'auth_login' })
  async login(@Payload() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Post('profile')
  @MessagePattern({ cmd: 'auth_profile' })
  async getProfile(@Payload() body: { email: string; password: string }) {
    return this.authService.validateUser(body.email, body.password);
  }
}
