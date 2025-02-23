import { IsEnum, IsOptional } from 'class-validator';
import { PaginacionDto } from 'src/common';
import { OrdersStatusList } from '../enum/orders.enum';
import { OrderStatus } from '@prisma/client';

export class OrderPaginationDto extends PaginacionDto {
  @IsOptional()
  @IsEnum(OrdersStatusList, {
    message: `valid status on ${OrdersStatusList}`,
  })
  status: OrderStatus;
}
