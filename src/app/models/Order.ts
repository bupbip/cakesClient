import {User} from "./User";
import {Cake} from "./Cake";

export interface Order {
  id?: number;
  customer: User;
  date: Date;
  resultPrice: number;
  cakes?: Cake[];
}
