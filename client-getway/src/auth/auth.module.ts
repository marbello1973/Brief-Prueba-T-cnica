import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, USER_SERVICE } from 'src/config';

@Module({
  controllers: [AuthController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.userMicroservicioHost,
          port: envs.userMicroservicioPort,
        },
      },
    ]),
  ],
})
export class AuthModule {}
