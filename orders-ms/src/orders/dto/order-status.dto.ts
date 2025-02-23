import { IsEnum, IsUUID } from 'class-validator';
import { OrdersStatusList } from '../enum/orders.enum';
import { OrderStatus } from '@prisma/client';

export class OrderStatusDto {
  @IsUUID(4)
  id: string;

  @IsEnum(OrdersStatusList, {
    message: `Valid status ${OrdersStatusList}`,
  })
  status: OrderStatus;
}
