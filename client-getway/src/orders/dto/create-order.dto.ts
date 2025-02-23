import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { OrdersStatusList, OrderStatus } from '../enum/orders.enum';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  totalAmount: number;

  @IsNumber()
  @IsPositive()
  totalItems: number;

  @IsEnum(OrdersStatusList, {
    message: `Status values are ${OrdersStatusList}`,
  })
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDIENTE;

  @IsBoolean()
  @IsOptional()
  paid: boolean = false;
}
