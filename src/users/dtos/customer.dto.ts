import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';
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
}

// PartialType permite reutilizar codigo utilizarndo las mismas validaciones y caracteristicas del clase que se extiende (CreateCustomerDto)
// y simplemente los atributos los hace opcionales
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
