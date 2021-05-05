import { IsMongoId, IsNotEmpty, IsDate, IsArray } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  // Creamos atributos de solo lectura y son requeridos
  @IsNotEmpty() // Decorador para validar campos no vacios
  @IsMongoId() // Decorador para validar que sea un id de mongo
  readonly customer: string;

  @IsDate() // Decorador para validar que se una fecha
  @IsNotEmpty() // Decorador para validar campos no vacios
  readonly date: Date;

  @IsArray() // Decorador para validar que sea un array
  @IsNotEmpty() // Decorador para validar campos no vacios
  readonly products: string[];
}

// PartialType permite reutilizar codigo utilizarndo las mismas validaciones y caracteristicas del clase que se extiende (CreateOrderDto)
// y simplemente los atributos los hace opcionales
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
