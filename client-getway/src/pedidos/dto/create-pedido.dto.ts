import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreatePedidoDto {
  @IsString()
  public pedido: string;

  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0)
  @Type(() => Number)
  public precio: number;

  @IsNumber()
  userId: number;
}
