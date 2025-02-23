import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { OrderPaginationDto, OrderStatusDto } from './dto';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Main Orderes');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('App conected database');
  }

  async create(createOrderDto: CreateOrderDto) {
    try {
      return await this.order.create({
        data: {
          ...createOrderDto,
          paidAt: createOrderDto.paidAt || new Date().toISOString(),
        },
      });
    } catch (error) {
      this.logger.error(`Error ${error}`);
      throw new InternalServerErrorException('Error creating order');
    }
  }

  async findAll(orderPaginationDto: OrderPaginationDto) {
    const totalPages = await this.order.count({
      where: {
        status: orderPaginationDto.status,
      },
    });

    const currentPage = orderPaginationDto.page || 1;
    const perPage = orderPaginationDto.limit || 10;

    return {
      data: await this.order.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        where: {
          status: orderPaginationDto.status,
        },
      }),
      meta: {
        total: totalPages,
        page: currentPage,
        lastPage: Math.ceil(totalPages / perPage),
      },
    };
  }

  async findOne(id: string) {
    const order = await this.order.findFirst({
      where: { id },
    });

    if (!order) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Order with id # ${id} not found`,
      });
    }
    return order;
  }

  async changeStatus(orderStatusDto: OrderStatusDto) {
    const { id, status } = orderStatusDto;
    const order = await this.findOne(id);
    if (order.status === status) {
      return order;
    }
    return this.order.update({
      where: { id },
      data: { status: status },
    });
  }
}
