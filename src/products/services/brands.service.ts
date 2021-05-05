import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {} // 👈 Indicamos que necesitamos inyectar Brand.name y agregamos tipado

  findAll() {
    return this.brandModel.find().exec(); // exec() indicamos la ejecucion
  }

  // Cambiamos el tipado de id dado que de Mongo recibimos Strings
  async findOne(id: string) {
    const product = await this.brandModel.findOne({ _id: id }).exec(); // buscamos el produto por el id
    // Validamos si existen el producto
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  create(data: CreateBrandDto) {
    const newBrand = new this.brandModel(data); // Creamos una nueva instancia de un modelo y le enviamos al informacion
    return newBrand.save(); // Gurdamos la Marca y lo retornamos
  }

  // Cambiamos el tipado de id dado que de Mongo recibimos Strings
  async update(id: string, changes: UpdateBrandDto) {
    const product = await this.brandModel
      // $set indicamos que solo cambie los atributos modifcados y No todo el modelo
      // new: true es una bandera que indica que nos muestre la nueva version del  producto actualizado
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();

    // Si el producto no exite
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }

    // Si el producto existe lo retornamos
    return product;
  }

  // Cambiamos el tipado de id dado que de Mongo recibimos Strings
  remove(id: string) {
    return this.brandModel.findByIdAndDelete(id); // Ejecutamos el metodo que busca por id y lo elimina
  }
}
