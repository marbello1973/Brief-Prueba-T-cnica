import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'createUser' })
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'findAllUser' })
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'findOneUser' })
  async findOne(@Payload() data: { id: number }) {
    return await this.userService.findOne(data.id);
  }
}
