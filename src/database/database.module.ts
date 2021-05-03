import { Module, Global } from '@nestjs/common';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

// El decorador @Global hace que el módulo tenga un alcance global.
// Los módulos globales deben registrarse solo una vez , generalmente por el módulo raíz o principal
@Global()
@Module({
  providers: [
    {
      // El API_KEY token se resolverá en el process.env.NODE_ENV objeto simulado
      provide: 'API_KEY',
      // useValue: API_KEY, // 👈 El API_KEY token se resolverá en el API_KEY

      // Otro ejemplo: El API_KEY token se resolverá dependiendo de la variable de ambiente process.env.NODE_ENV
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  // Con exports indicamos que nuestro provide pueda ser utilizado por cualquier componente
  // y no se necesitara ser importado en los componentes
  exports: ['API_KEY'],
})
export class DatabaseModule {}
