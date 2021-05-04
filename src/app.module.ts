import { Module, HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // config nos permite utilizar variables de entorno
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

import * as Joi from 'joi'; // 👈
import { MongoClient } from 'mongodb';

import { enviroments } from './enviroments'; // 👈
import config from './config'; // 👈 Importamos la configuracion

// URL de conexion a la base de datos de mongo
const uri =
  'mongodb://root:root@localhost:27017/?authSource=admin&readPreference=primary';

// Creamos la instancia de mongoClient
const client = new MongoClient(uri);

// Creamos una funcion asincrona para conectar al cliente
async function run() {
  await client.connect(); // Conectamos al cliente
  const database = client.db('platzi-store'); // Indicamos la base de datos de la conexcion
  const taskCollection = database.collection('tasks'); // Indicamos la coleccion
  const tasks = await taskCollection.find().toArray(); // Obtenemos todas las tareas de la coleccion indicada
  console.log(tasks); // imprimimos el array de la coleccion
}

//Ejecutamos la funcion asincrona
run();

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      // 👈 Implement ConfigModule
      envFilePath: enviroments[process.env.NODE_ENV] || '.env', // 👈 Utilizamos enviroments para leer el archivo a leer
      load: [config], // 👈 Cargamos la configuracion para inyectar
      isGlobal: true, // Indicamos que la configuracion sera Global y todos la podran usar
      validationSchema: Joi.object({
        // 👈 Utilizamos la libreria de JOI para las validaciones
        API_KEY: Joi.number().required(), //Validamos que API_KEY sea numero y sera requerido
        DATABASE_NAME: Joi.string().required(), //Validamos que DATABASE_NAME sea string y sera requerido
        DATABASE_PORT: Joi.number().required(), //Validamos que DATABASE_PORT sea numero y sera requerido
      }),
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
