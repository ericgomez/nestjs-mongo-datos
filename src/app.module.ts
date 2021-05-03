import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Module({
  imports: [ProductsModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // El API_KEY token se resolverá en el process.env.NODE_ENV objeto simulado
      provide: 'API_KEY',
      // useValue: API_KEY, // 👈 El API_KEY token se resolverá en el API_KEY

      // Otro ejemplo: El API_KEY token se resolverá dependiendo de la variable de ambiente process.env.NODE_ENV
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
})
export class AppModule {}
