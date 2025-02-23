import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('User-Service');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Conectado a base de datos user');
  }

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const hashPassword = await bcrypt.hash(password, 10);

    const userEmail = await this.user.findUnique({
      where: { email },
    });

    if (userEmail) {
      throw new RpcException(`El email ${email} ya esta registrado`);
    }
    return this.user.create({
      data: {
        ...createUserDto,
        password: hashPassword,
      },
    });
  }

  async findAll() {
    return await this.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `User with id #${id} not found`,
      });
    }
    return user;
  }

  async findByEmail(email: string) {
    return await this.user.findUnique({ where: { email } });
  }
}
