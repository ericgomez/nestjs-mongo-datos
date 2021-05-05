import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrdersService {
  // Realizamos la inyeccion del motodo ProductsService
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {} // 👈 Indicamos que necesitamos inyectar Order.name y agregamos tipado

  findAll() {
    return this.orderModel
      .find()
      .populate('customer') // 👈 Realizamos el JOIN hacia el atributo customer -> 1:1
      .populate('products') // 👈 Realizamos el JOIN hacia el atributo products -> 1:N
      .exec();
  }

  // Cambiamos el tipado de id dado que de Mongo recibimos Strings
  async findOne(id: string) {
    return this.orderModel.findById(id);
  }

  create(data: CreateOrderDto) {
    const newModel = new this.orderModel(data);
    return newModel.save();
  }

  // Cambiamos el tipado de id dado que de Mongo recibimos Strings
  update(id: string, changes: UpdateOrderDto) {
    return this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  // Cambiamos el tipado de id dado que de Mongo recibimos Strings
  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }
}
