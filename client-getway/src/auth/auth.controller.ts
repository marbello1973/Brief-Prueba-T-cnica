import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE } from 'src/config';

@Controller('auth')
export class AuthController {
  constructor(@Inject(USER_SERVICE) private readonly userClient: ClientProxy) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.userClient.send({ cmd: 'auth_login' }, body);
  }

  @Post('profile')
  getProfile(@Body() body: { email: string }) {
    return this.userClient.send({ cmd: 'auth_profile' }, body);
  }
}
