import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, USER_SERVICE } from 'src/config';

@Module({
  controllers: [],
  providers: [],
  // se agrego esto
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
  exports: [ClientsModule],
})
export class UserPedidoModule {}
