import { IsString, IsNotEmpty, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  // Creamos atributos de solo lectura y son requeridos
  @IsString() // Decorador para validar String
  @IsNotEmpty() // Decorador para validar campos no vacios
  readonly name: string;

  @IsUrl() // Decorador para validar Url
  @IsNotEmpty() // Decorador para validar campos no vacios
  readonly image: string;
}

// PartialType permite reutilizar codigo utilizarndo las mismas validaciones y caracteristicas del clase que se extiende (CreateCategoryDto)
// y simplemente los atributos los hace opcionales
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
