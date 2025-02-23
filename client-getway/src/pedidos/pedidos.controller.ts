import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginacionDto } from 'src/common';
import { PEDIDO_SERVICE } from 'src/config';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(
    @Inject(PEDIDO_SERVICE) private readonly pedidoClient: ClientProxy,
  ) {}

  @Post()
  createPedido(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidoClient.send({ cmd: 'create_pedido' }, createPedidoDto);
  }

  @Get()
  findAllPedidos(@Query() paginacionDto: PaginacionDto) {
    return this.pedidoClient.send({ cmd: 'findall_pedido' }, paginacionDto);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    try {
      const pedido = await firstValueFrom(
        this.pedidoClient.send({ cmd: 'findone_pedido' }, { id }),
      );
      return pedido;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('user/:userId')
  findPedidosByUserId(@Param('userId') userId: number) {
    return this.pedidoClient.send(
      { cmd: 'find_pedido_by_user_id' },
      { userId: Number(userId) },
    );
  }

  @Delete(':id')
  deletePedido(@Param('id') id: number) {
    return this.pedidoClient.send({ cmd: 'delete_pedido' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  updatePedido(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePedidoDto: UpdatePedidoDto,
  ) {
    return this.pedidoClient
      .send({ cmd: 'update_pedido' }, { id, ...updatePedidoDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
