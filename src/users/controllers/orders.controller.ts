import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrdersService } from '../services/orders.service';
import {
  CreateOrderDto,
  UpdateOrderDto,
  AddProductsToOrderDto,
} from '../dtos/order.dto';

@ApiTags('orders') // 👈 Agregar un tag en la docuemntacion para separarlo por el grupo products
@Controller('orders') // NO necesitamos agregar la ruta de products en nuestros @Gets por que ya esta definido en el @Controller
export class OrdersController {
  // Para incluir un servicio en un controlador usas el patrón de inyección de dependencias
  constructor(private ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateOrderDto) {
    return this.ordersService.update(id, payload);
  }

  @Put(':id/products') // 👈 add product by order
  addProducts(@Param('id') id: string, @Body() payload: AddProductsToOrderDto) {
    return this.ordersService.addProducts(id, payload.productsIds); // Mandamos llamar al metodo addProducts del servicio
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }

  @Delete(':id/product/:productId') // 👈 delete product by order
  removeProduct(
    // Recibimos los parametros
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return this.ordersService.removeProduct(id, productId); // Mandamos llamar al metodo removeProduct del servicio
  }
}
