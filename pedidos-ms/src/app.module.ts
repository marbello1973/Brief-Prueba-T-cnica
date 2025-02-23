import { Module } from '@nestjs/common';
import { PedidosModule } from './pedidos/pedidos.module';
import { UserPedidoModule } from './user-pedido/user-pedido.module';

@Module({
  imports: [PedidosModule, UserPedidoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
