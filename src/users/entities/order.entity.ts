import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Customer } from './customer.entity';

@Schema() // El decorador @Schema() marca una clase como definición de esquema.
export class Order extends Document {
  // Product extiende de document

  @Prop({ type: Date }) // Indicamos que la variable sera de tipo fecha
  date: Date;

  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true }) // Indicamos que la variable sera una propiedad, sera requerida, sera un objeto y tendra de refencia el nombre
  customer: Customer | Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order); // Exportamos un esquema apartir de la clase Order
