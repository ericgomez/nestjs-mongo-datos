import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User, UserSchema } from './entities/user.entity';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { Order, OrderSchema } from './entities/order.entity';

// Utilizamos ProductsModule que es el modulo exportado por products
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    // Products.module se encargar de manejar a esta entidad
    //Configuramos el modulo
    ProductsModule, // Importamos el modulo externo de productsModule
    MongooseModule.forFeature([
      {
        name: Customer.name, // Indicamos el nombre del esquema
        schema: CustomerSchema, // El esquema a utilizar
      },
      {
        name: User.name, // Indicamos el nombre del esquema
        schema: UserSchema, // El esquema a utilizar
      },
      {
        name: Order.name, // Indicamos el nombre del esquema
        schema: OrderSchema, // El esquema a utilizar
      },
    ]),
  ], // importamos el modulo de products para poder utilizarlo en users
  controllers: [CustomerController, UsersController, OrdersController],
  providers: [CustomersService, UsersService, OrdersService],
})
export class UsersModule {}
