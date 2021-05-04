import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';

import { ProductsController } from './controllers/products.controller';
import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsService } from './services/products.service';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';

@Module({
  imports: [
    // Products.module se encargar de manejar a esta entidad
    //Configuramos el modulo
    MongooseModule.forFeature([
      {
        name: Product.name, // Indicamos el nombre del esquema
        schema: ProductSchema, // El esquema a utilizar
      },
    ]),
  ],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, BrandsService, CategoriesService],
  // Nota: Como cada modulo es aislado podemos exporta un para que cualquier otro modulo lo pueda usar
  // en este caso lo exportamo para que lo pueda usar el modulo -> users
  exports: [ProductsService],
})
export class ProductsModule {}
