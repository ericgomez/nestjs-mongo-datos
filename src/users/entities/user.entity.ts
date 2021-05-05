import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema() // El decorador @Schema() marca una clase como definición de esquema.
export class User extends Document {
  // Product extiende de document

  @Prop({ required: true, unique: true }) // Indicamos que la variable sera una propiedad,  sera requerida y unica
  email: string;

  @Prop({ required: true }) // Indicamos que la variable sera una propiedad y sera requerida
  password: string;

  @Prop({ required: true }) // Indicamos que la variable sera una propiedad y sera requerida
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User); // Exportamos un esquema apartir de la clase User
