import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

import { isMongoId } from 'class-validator'; // Validaciones con class-validator, el cual ya tiene un validador para mongoIds

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    // La libreria de 'class-validator' tiene dos formas en la que podemos utilizar los Decoradores como: 'Decoradores' o como 'Funciones'
    // Podemos deferencia una de otra, Si la primera letra es mayuscula es 'Dedorador' y si es minuscula es una 'Funcion', ejemplo con la Funcion: isMongoId

    // Validamos si el valor es un MongoId
    if (!isMongoId(value)) {
      // Mostramos un mensaje de error con BadRequestException
      throw new BadRequestException(`${value} is not a mongoId`);
    }
    return value;
  }
}
