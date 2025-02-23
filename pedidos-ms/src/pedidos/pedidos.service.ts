import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaClient } from '@prisma/client';
import { PaginacionDto } from 'src/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { USER_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PedidosService extends PrismaClient implements OnModuleInit {
  constructor(@Inject(USER_SERVICE) private readonly userClient: ClientProxy) {
    super();
  }

  private readonly logger = new Logger('PedidosService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Concetado base de datos');
  }

  /*
  create(createPedidoDto: CreatePedidoDto) {
    return this.pedidos.create({
      data: createPedidoDto,
    });
  }
  */

  async create(createPedidoDto: CreatePedidoDto) {
    const { userId, ...pedidoData } = createPedidoDto;

    const user = await firstValueFrom(
      this.userClient.send({ cmd: 'findOneUser' }, { id: userId }),
    );

    if (!user) {
      throw new RpcException({
        message: `UserId ${userId} not found`,
        status: HttpStatus.NOT_FOUND,
      });
    }
    return this.pedidos.create({
      data: {
        ...pedidoData,
        userId,
      },
    });
  }

  async findAll(paginacionDto: PaginacionDto) {
    const { page = 1, limit = 10 } = paginacionDto;
    const totalPage = await this.pedidos.count({ where: { estado: true } });
    const lastPage = Math.ceil(totalPage / limit);
    return {
      data: await this.pedidos.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          estado: true,
        },
      }),
      meta: {
        totalPage: totalPage,
        page: page,
        lastPage: lastPage,
      },
    };
  }

  async findOne(id: number) {
    const pedido = await this.pedidos.findFirst({
      where: { id, estado: true },
    });

    if (!pedido) {
      throw new RpcException({
        message: `Pedido con id ${id} no existe`,
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    const { id: __, ...data } = updatePedidoDto;

    await this.findOne(id);

    return this.pedidos.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    const pedido = await this.pedidos.update({
      where: { id },
      data: { estado: false },
    });
    return pedido;
  }

  async findPedidosByUser(userId: number) {
    return await this.pedidos.findMany({ where: { userId: Number(userId) } });
  }
}
