import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../entities/user.entity';
import { ProductsService } from './../../products/services/products.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  // Realizamos la inyeccion del motodo ProductsService
  constructor(
    private productsService: ProductsService,
    @Inject('MONGO') private databaseMongo: Db,
    @InjectModel(User.name) private userModel: Model<User>, // 👈 Indicamos que necesitamos inyectar User.name y agregamos tipado
  ) {}

  findAll() {
    return this.userModel.find().exec();
  }

  getTasks() {
    const tasksCollection = this.databaseMongo.collection('tasks');
    return tasksCollection.find().toArray();
  }

  // Cambiamos el tipado de id dado que de Mongo recibimos Strings
  async findOne(id: string) {
    return this.userModel.findById(id);
  }

  async getOrdersByUser(userId: string) {
    const user = await this.findOne(userId);
    return {
      date: new Date(),
      user,
      // products: this.productsService.findAll(),
      products: [],
    };
  }

  create(data: CreateUserDto) {
    const newModel = new this.userModel(data);
    return newModel.save();
  }

  // Cambiamos el tipado de id dado que de Mongo recibimos Strings
  update(id: string, changes: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  // Cambiamos el tipado de id dado que de Mongo recibimos Strings
  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
