import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  // ParseIntPipe,
} from '@nestjs/common';

import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger'; // 👈

import { ParseIntPipe } from '../../common/parse-int.pipe';
import { MongoIdPipe } from './../../common/mongo-id.pipe'; // 👈 importamos el Pipe
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dtos/products.dtos';

import { ProductsService } from './../services/products.service';

@ApiTags('products') // 👈 Agregar un tag en la docuemntacion para separarlo por el grupo products
@Controller('products') // NO necesitamos agregar la ruta de products en nuestros @Gets por que ya esta definido en el @Controller
export class ProductsController {
  // Para incluir un servicio en un controlador usas el patrón de inyección de dependencias
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of products' }) // 👈 Agregar una descripcion pequeña en el endpoint
  getProducts(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Get('filter')
  getProductFilter() {
    return `yo soy un filter`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  // 👈 use MongoIdPipe
  getOne(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
