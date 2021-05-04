import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional, // 👈 new decorator
  Min, // 👈 new decorator
  ValidateIf, // 👈 new decorator que Vuelve condional algunos parametros
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

  @IsOptional() // El atributo minPrice es opcional
  @Min(0) // El atributo minPrice debe tener un minimo de 0 en adelante
  minPrice: number;

  @ValidateIf((params) => params.minPrice) // El atributo maxPrice sera Oblogatario si y solo si existe minPrice
  @IsPositive() // El  atributo maxPrice debe ser positivo
  maxPrice: number;
}
