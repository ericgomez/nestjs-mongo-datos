import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Brand } from './brand.entity';

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

  // Indicamos que la variable sera una propiedad
  @Prop(
    //Indicamos que tandra SubObjecto (SubDocuemnto)
    raw({
      name: { type: String }, // Indicamos que name es de tipo String
      image: { type: String }, // Indicamos que image es de tipo String
    }),
  )
  category: Record<string, any>; // 👈 Forma de resolver una relacion

  @Prop({ type: Types.ObjectId, ref: Brand.name }) // 👈  // Indicamos que la variable sera una propiedad de tipo ObjectId, tambien es una referencia Brand.name
  brand: Brand | Types.ObjectId; // El atributo puede tomar dos valores un Objeto: Brand o un ObjectId: Types.ObjectId
}

// Relaciones uno a uno referenciadas
export const ProductSchema = SchemaFactory.createForClass(Product); // Exportamos un esquema apartir de la clase Product
// 👈 Otra forma es una indexacion compuesta
ProductSchema.index({ price: 1, stock: -1 }); // En price indicamos el orden ascendente y en stock indicamos el orden descendente
