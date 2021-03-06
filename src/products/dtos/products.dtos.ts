import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional, // ๐ new decorator
  Min, // ๐ new decorator
  ValidateIf, // ๐ new decorator que Vuelve condional algunos parametros
  ValidateNested, // ๐ new decorator que permite realizar validaciones en cascada
  IsMongoId, // ๐ new decorator
  IsArray, // ๐ new decorator
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger'; // swagger espara docuemtar la API
import { CreateCategoryDto } from './category.dtos'; // Importamos category.dtos

import { Type } from 'class-transformer'; // ๐ transform

import { CreateSubDocDto } from './sub-doc.dto'; // ๐ import

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` }) // ๐ use ApiProperty
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty() // ๐ use ApiProperty
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty() // ๐ use ApiProperty
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty() // ๐ use ApiProperty
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty() // ๐ use ApiProperty
  readonly image: string;

  @IsNotEmpty() // Indicamos que category no sera vacio
  @ValidateNested() // Indicamos que category contendra otro docuemnto demanera embebida en cascada
  @ApiProperty() // Permite que swagger comprenda el tipo de datos de los campos json y mรกs
  readonly category: CreateCategoryDto; // ๐ new field

  @IsNotEmpty() // Indicamos que category no sera vacio
  @IsMongoId() // Decorador para validar que sea un id de mongo
  readonly brand: string; // ๐ new field

  @IsNotEmpty()
  @ValidateNested() // permite realizar validaciones en cascada
  readonly subDoc: CreateSubDocDto; // ๐ 1:1

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true }) // permite realizar validaciones en cascada y valida una matriz de objetos
  @Type(() => CreateSubDocDto)
  readonly subDocs: CreateSubDocDto[]; // ๐ 1:N
}

// PartialType permite reutilizar codigo utilizarndo las mismas validaciones y caracteristicas del clase que se extiende (CreateProductDto)
// y simplemente los atributos los hace opcionales
export class UpdateProductDto extends PartialType(CreateProductDto) {}

// ๐ new DTO
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
