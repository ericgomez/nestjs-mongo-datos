import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@ApiTags('users') // 👈 Agregar un tag en la docuemntacion para separarlo por el grupo products
@Controller('users') // NO necesitamos agregar la ruta de products en nuestros @Gets por que ya esta definido en el @Controller
export class UsersController {
  // Para incluir un servicio en un controlador usas el patrón de inyección de dependencias
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'List of users',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('tasks')
  tasks() {
    return this.usersService.getTasks();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get(':id/orders') //  👈 new endpoint
  getOrders(@Param('id') id: string) {
    return this.usersService.getOrdersByUser(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
