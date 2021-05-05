import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomersService {
  // Realizamos la inyeccion del motodo ProductsService
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>, // 👈 Indicamos que necesitamos inyectar Customer.name y agregamos tipado
  ) {}

  findAll() {
    return this.customerModel.find().exec();
  }

  // Cambiamos el tipado de id dado que de Mongo recibimos Strings
  async findOne(id: string) {
    return this.customerModel.findById(id);
  }

  create(data: CreateCustomerDto) {
    const newModel = new this.customerModel(data);
    return newModel.save();
  }

  // Cambiamos el tipado de id dado que de Mongo recibimos Strings
  update(id: string, changes: UpdateCustomerDto) {
    return this.customerModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  // Cambiamos el tipado de id dado que de Mongo recibimos Strings
  remove(id: string) {
    return this.customerModel.findByIdAndDelete(id);
  }
}
