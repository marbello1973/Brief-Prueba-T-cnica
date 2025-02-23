import { Controller } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PaginacionDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @MessagePattern({ cmd: 'create_pedido' })
  create(@Payload() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @MessagePattern({ cmd: 'findall_pedido' })
  findAll(@Payload() paginacionDto: PaginacionDto) {
    return this.pedidosService.findAll(paginacionDto);
  }

  @MessagePattern({ cmd: 'findone_pedido' })
  findOne(@Payload('id') id: number) {
    return this.pedidosService.findOne(+id);
  }

  @MessagePattern({ cmd: 'update_pedido' })
  update(@Payload() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidosService.update(+updatePedidoDto.id, updatePedidoDto);
  }

  @MessagePattern({ cmd: 'delete_pedido' })
  remove(@Payload('id') id: string) {
    return this.pedidosService.remove(+id);
  }

  @MessagePattern({ cmd: 'find_pedido_by_user_id' })
  async findPedidosByUserId(@Payload() data: { userId: number }) {
    return await this.pedidosService.findPedidosByUser(data.userId);
  }
}
