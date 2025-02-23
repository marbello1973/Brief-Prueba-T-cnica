import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { UserPedidoModule } from 'src/user-pedido/user-pedido.module';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService],
  imports: [UserPedidoModule],
})
export class PedidosModule {}
