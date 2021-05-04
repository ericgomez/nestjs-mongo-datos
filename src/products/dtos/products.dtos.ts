import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional, // 👈 new decorator
  Min, // 👈 new decorator
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger'; // swagger espara docuemtar la API

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
}

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
}
