import { Module, HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // config nos permite utilizar variables de entorno
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      // 👈 Implement ConfigModule
      envFilePath: '.env', // Archivo a leer
      isGlobal: true, // Indicamos que la configuracion sera Global y todos la podran usar
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS', //Nombre del Proveedor
      // 👈 implement useFactory de manera async
      useFactory: async (http: HttpService) => {
        // Ejemplo realizando una peticion a una API REST
        const tasks = await http
          .get('https://jsonplaceholder.typicode.com/todos')
          .toPromise();
        // Retornamos la informacion
        return tasks.data;
      },
      // useFactory permite realizar una injeccion de dependencias
      // En teste caso se injecta el HttpService
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
