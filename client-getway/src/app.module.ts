import { Module } from '@nestjs/common';
import { PedidosModule } from './pedidos/pedidos.module';
import { OrdersModule } from './orders/orders.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PedidosModule, OrdersModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
