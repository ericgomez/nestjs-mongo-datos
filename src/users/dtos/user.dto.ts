import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  // Creamos atributos de solo lectura y son requeridos
  @IsString() // Decorador para validar String
  @IsEmail() // Decorador para validar que sea un email
  @ApiProperty({ description: 'the email of user' }) // Permite que swagger comprenda el tipo de datos de los campos json y más
  readonly email: string;

  @IsString() // Decorador para validar String
  @IsNotEmpty() // Decorador para validar campos no vacios
  @Length(6) // Decorador para validar que el tamaño del campo de >= 6 en adelante
  @ApiProperty({ description: "the user' password", deprecated: true }) // Permite que swagger comprenda el tipo de datos de los campos json y más
  readonly password: string;

  @IsNotEmpty() // Decorador para validar campos no vacios
  readonly role: string;
}

// PartialType permite reutilizar codigo utilizarndo las mismas validaciones y caracteristicas del clase que se extiende (CreateUserDto)
// y simplemente los atributos los hace opcionales
export class UpdateUserDto extends PartialType(CreateUserDto) {}
