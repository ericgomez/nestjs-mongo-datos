import { User } from './user.entity';
import { Product } from './../../products/entities/product.entity';

// 👈 new entity
export class Order {
  date: Date;
  user: User;
  products: Product[]; // Uilizamos la clase de productos
}
