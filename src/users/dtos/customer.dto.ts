import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsArray, // 👈 new decorator
  ValidateNested, // 👈 new decorator
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCustomerDto {
  // Creamos atributos de solo lectura y son requeridos
  @IsString() // Decorador para validar String
  @IsNotEmpty() // Decorador para validar campos no vacios
  readonly name: string;

  @IsString() // Decorador para validar String
  @IsNotEmpty() // Decorador para validar campos no vacios
  readonly lastName: string;

  @IsPhoneNumber() // Decorador para validar que sea un numero
  @IsNotEmpty() // Decorador para validar campos no vacios
  readonly phone: string;

  @IsArray() // Decorador para validar que sea un Array
  @IsNotEmpty() // Decorador para validar campos no vacios
  readonly skills: any; // 👈 El atributo puede recibir cualquier tipo de dato
}

// PartialType permite reutilizar codigo utilizarndo las mismas validaciones y caracteristicas del clase que se extiende (CreateCustomerDto)
// y simplemente los atributos los hace opcionales
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
