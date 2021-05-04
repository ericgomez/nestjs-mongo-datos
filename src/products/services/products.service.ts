import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './../entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from './../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>, // 👈 Indicamos que necesitamos inyectar Product.name y agregamos tipado
  ) {}

  // Con el ? indicamos que los parametros son opcionales
  findAll(params?: FilterProductsDto) {
    // Validamos si existen los parametros
    if (params) {
      const { limit, offset } = params; // Obtenemos los parametros
      return this.productModel.find().skip(offset).limit(limit).exec(); // 👈 retornamos los productos pero con los filtros para la paginacion
    }
    return this.productModel.find().exec(); // exec() indicamos la ejecucion
  }

  // Cambiamos el tipado de id dado que de Mongo recibimos Strings
  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec(); // Buscamos por el id con findById
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    const newProduct = new this.productModel(data); // Creamos una nueva instancia de un modelo y le enviamos al informacion
    return newProduct.save(); // Gurdamos el producto y lo retornamos
  }

  // Cambiamos el tipado de id dado que de Mongo recibimos Strings
  update(id: string, changes: UpdateProductDto) {
    const product = this.productModel
      // $set indicamos que solo cambie los atributos modifcados y No todo el modelo
      // new: true es una bandera que indica que nos muestre la nueva version del  producto actualizado
      .findByIdAndUpdate(id, { $set: changes }, { new: true }) // Buscamos el metodo findByIdAndUpdate y pasamos lo que queremos que cambie
      .exec(); // Ejecutamos

    // Si el producto no exite
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    // Si el producto existe lo retornamos
    return product;
  }

  // Cambiamos el tipado de id dado que de Mongo recibimos Strings
  remove(id: string) {
    return this.productModel.findByIdAndDelete(id); // Ejecutamos el metodo que busca por id y lo elimina
  }
}
