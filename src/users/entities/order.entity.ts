import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Customer } from './customer.entity';
import { Product } from '../../products/entities/product.entity';

@Schema() // El decorador @Schema() marca una clase como definición de esquema.
export class Order extends Document {
  // Product extiende de document

  @Prop({ type: Date }) // Indicamos que la variable sera de tipo fecha
  date: Date;

  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true }) // Indicamos que la variable sera una propiedad, sera requerida, sera un objeto y tendra de refencia el nombre
  customer: Customer | Types.ObjectId; // 👈 relation 1:1 customer

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] }) // 👈 Indicamos que la variable sera una propiedad de tipo ObjectId, tambien es una referencia Product.name
  products: Types.Array<Product>; // 👈 Variable de tipo Array tipado Como un Producto, -> relation 1:N
}

export const OrderSchema = SchemaFactory.createForClass(Order); // Exportamos un esquema apartir de la clase Order
