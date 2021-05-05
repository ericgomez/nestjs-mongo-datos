import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional, // 👈 new decorator
  Min, // 👈 new decorator
  ValidateIf, // 👈 new decorator que Vuelve condional algunos parametros
  ValidateNested, // 👈 new decorator que permite realizar validaciones en cascada
  IsMongoId, // 👈 new decorator
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger'; // swagger espara docuemtar la API
import { CreateCategoryDto } from './category.dtos'; // Importamos category.dtos

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` }) // 👈 use ApiProperty
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty() // 👈 use ApiProperty
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty() // 👈 use ApiProperty
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty() // 👈 use ApiProperty
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty() // 👈 use ApiProperty
  readonly image: string;

  @IsNotEmpty() // Indicamos que category no sera vacio
  @ValidateNested() // Indicamos que category contendra otro docuemnto demanera embebida en cascada
  @ApiProperty() // Permite que swagger comprenda el tipo de datos de los campos json y más
  readonly category: CreateCategoryDto; // 👈 new field

  @IsNotEmpty() // Indicamos que category no sera vacio
  @IsMongoId() // Decorador para validar que sea un id de mongo
  readonly brand: string; // 👈 new field
}

// PartialType permite reutilizar codigo utilizarndo las mismas validaciones y caracteristicas del clase que se extiende (CreateProductDto)
// y simplemente los atributos los hace opcionales
export class UpdateProductDto extends PartialType(CreateProductDto) {}

// 👈 new DTO
export class FilterProductsDto {
  // Creamos los atributos
  @IsOptional() // El  atributo limit es opcional
  @IsPositive() // El  atributo limit debe ser positivo
  limit: number;

  @IsOptional() // El atributo offset es opcional
  @Min(0) // El atributo offset debe tener un minimo de 0 en adelante
  offset: number;

  @IsOptional() // El atributo minPrice es opcional
  @Min(0) // El atributo minPrice debe tener un minimo de 0 en adelante
  minPrice: number;

  @ValidateIf((params) => params.minPrice) // El atributo maxPrice sera Oblogatario si y solo si existe minPrice
  @IsPositive() // El  atributo maxPrice debe ser positivo
  maxPrice: number;
}
