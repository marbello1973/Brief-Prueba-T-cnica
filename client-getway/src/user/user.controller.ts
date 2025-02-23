import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(@Inject(USER_SERVICE) private readonly userClient: ClientProxy) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userClient.send({ cmd: 'createUser' }, createUserDto);
  }

  @Get()
  findAll() {
    return this.userClient.send({ cmd: 'findAllUser' }, {});
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userClient.send({ cmd: 'findOneUser' }, id);
  }
}
