import { IsEnum, IsOptional } from 'class-validator';
import { OrdersStatusList, OrderStatus } from '../enum/orders.enum';

export class StatusDto {
  @IsOptional()
  @IsEnum(OrdersStatusList, {
    message: `Valid status ${OrdersStatusList}`,
  })
  status: OrderStatus;
}
