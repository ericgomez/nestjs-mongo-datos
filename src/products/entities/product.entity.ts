import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema() // El decorador @Schema() marca una clase como definición de esquema.
export class Product extends Document {
  // Product extiende de document

  @Prop({ required: true }) // Indicamos que la variable sera una propiedad y sera requerida
  name: string;

  @Prop() // Indicamos que la variable sera una propiedad
  description: string;

  @Prop({ type: Number, index: true }) // Indicamos que la variable sera una propiedad y sera numerica, tabien tendra indexacion
  price: number;

  @Prop({ type: Number }) // Indicamos que la variable sera una propiedad y sera numerica
  stock: number;

  @Prop() // Indicamos que la variable sera una propiedad
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product); // Exportamos un esquema apartir de la clase Product
// 👈 Otra forma es una indexacion compuesta
ProductSchema.index({ price: 1, stock: -1 }); // En price indicamos el orden ascendente y en stock indicamos el orden descendente
