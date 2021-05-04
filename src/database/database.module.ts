import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config'; // Configuracion de typado
import { MongooseModule } from '@nestjs/mongoose'; // 👈 Import
import { MongoClient } from 'mongodb';

import config from '../config'; // 👈 import config

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

// El decorador @Global hace que el módulo tenga un alcance global.
// Los módulos globales deben registrarse solo una vez , generalmente por el módulo raíz o principal
@Global()
@Module({
  imports: [
    // 👈 forRootAsync configuramos de manera Async que quiere decir que primero necesito las variables de entorno
    MongooseModule.forRootAsync({
      // 👈 Implement Module useFactory que permite inyeccion de dependencias
      useFactory: (configService: ConfigType<typeof config>) => {
        const {
          connection,
          user,
          password,
          host,
          port,
          dbName,
        } = configService.mongo; // 👈 Obtenemos la configuracion de las variables de entorno de mongo

        // Retornmos un Objeto
        return {
          uri: `${connection}://${host}:${port}`, // Indicamos la conexion
          user, // Indicamos el usuario
          pass: password, // Indicamos el password
          dbName, // Inidamos el nombre de la base de datos
        };
      },
      inject: [config.KEY], // 👈 Inject dependecias que queremos inyectar
    }),
  ],
  providers: [
    {
      // El API_KEY token se resolverá en el process.env.NODE_ENV objeto simulado
      provide: 'API_KEY',
      // useValue: API_KEY, // 👈 El API_KEY token se resolverá en el API_KEY

      // Otro ejemplo: El API_KEY token se resolverá dependiendo de la variable de ambiente process.env.NODE_ENV
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO', // Creamos un nuevo proveedor
      // 👈 Inject w/ useFactory
      useFactory: async (configService: ConfigType<typeof config>) => {
        const {
          connection,
          user,
          password,
          host,
          port,
          dbName,
        } = configService.mongo; // 👈 Obtenemos la configuracion de las variables de entorno de mongo

        // URL de conexion a la base de datos de mongo
        const uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`;
        // Creamos la instancia de mongoClient
        const client = new MongoClient(uri);
        await client.connect(); // Conectamos al cliente
        const database = client.db(dbName); // Indicamos la base de datos de la conexcion
        return database; // Retornamos la base de datos como un inyectable para la base de datos
        // Este metodo utiliza el patron SINGLETON - Crea la instancia una sola vez por parte de Nest
      },
      inject: [config.KEY], // 👈 Inject dependecias que queremos inyectar
    },
  ],
  // Con exports indicamos que nuestro provide pueda ser utilizado por cualquier componente
  // y no se necesitara ser importado en los componentes
  exports: ['API_KEY', 'MONGO', MongooseModule], // Exportamos
})
export class DatabaseModule {}
