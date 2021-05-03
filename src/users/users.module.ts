import { Module } from '@nestjs/common';

import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

// Utilizamos ProductsModule que es el modulo exportado por products
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule], // importamos el modulo de products para poder utilizarlo en users
  controllers: [CustomerController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
