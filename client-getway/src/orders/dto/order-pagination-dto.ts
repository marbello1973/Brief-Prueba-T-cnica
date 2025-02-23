import { IsEnum, IsOptional } from 'class-validator';
import { PaginacionDto } from 'src/common';
import { OrdersStatusList, OrderStatus } from '../enum/orders.enum';

export class OrderPaginationDto extends PaginacionDto {
  @IsOptional()
  @IsEnum(OrdersStatusList, {
    message: `valid status on ${OrdersStatusList}`,
  })
  status: OrderStatus;
}
