/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { OrderStatus } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { OrdersStatusList } from '../enum/orders.enum';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  public totalAmount: number;

  @IsNumber()
  @IsPositive()
  public totalItems: number;

  @IsEnum(OrdersStatusList, {
    message: `Status values are ${OrdersStatusList}`,
  })
  @IsOptional()
  public status: OrderStatus = OrderStatus.PENDIENTE;

  @IsBoolean()
  @IsOptional()
  public paid: boolean = false;

  @IsDateString()
  @IsOptional()
  public paidAt: string;
}
