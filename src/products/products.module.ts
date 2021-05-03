import { Module } from '@nestjs/common';

import { ProductsController } from './controllers/products.controller';
import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsService } from './services/products.service';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';

@Module({
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, BrandsService, CategoriesService],
  // Nota: Como cada modulo es aislado podemos exporta un para que cualquier otro modulo lo pueda usar
  // en este caso lo exportamo para que lo pueda usar el modulo -> users
  exports: [ProductsService],
})
export class ProductsModule {}
