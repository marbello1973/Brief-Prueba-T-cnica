import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PEDIDO_SERVICE, envs } from 'src/config';

@Module({
  controllers: [PedidosController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: PEDIDO_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.pedidoMicroserviceHost,
          port: envs.pedidoMicroservicePort,
        },
      },
    ]),
  ],
})
export class PedidosModule {}
