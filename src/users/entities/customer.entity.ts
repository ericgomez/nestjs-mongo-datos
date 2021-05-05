import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema() // El decorador @Schema() marca una clase como definición de esquema.
export class Customer extends Document {
  // Product extiende de document

  @Prop({ required: true }) // Indicamos que la variable sera una propiedad y sera requerida
  name: string;

  @Prop({ required: true }) // Indicamos que la variable sera una propiedad y sera requerida
  lastName: string;

  @Prop() // Indicamos que la variable sera una propiedad
  phone: string;

  @Prop({
    type: [{ name: { type: String }, color: { type: String } }], // Indicamos que la variable sera una propiedad de tipo array de tipo string con dos campos nombre y color
  })
  skills: Types.Array<Record<string, any>>; // 👈 La variable sera de tipo Array y como es embebido utilizamos Record
}

export const CustomerSchema = SchemaFactory.createForClass(Customer); // Exportamos un esquema apartir de la clase Customer
