import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema() // El decorador @Schema() marca una clase como definición de esquema.
export class Brand extends Document {
  // Product extiende de document

  @Prop({ required: true, unique: true }) // Indicamos que la variable sera una propiedad y sera requerida, tabien sera unica
  name: string;

  @Prop() // Indicamos que la variable sera una propiedad
  image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand); // Exportamos un esquema apartir de la clase Brand
