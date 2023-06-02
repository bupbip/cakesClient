import {Order} from "./Order";

export interface Cake {
  id?: number;
  order: Order;
  cakeSize: string;
  designRating: number;
  photo: File;
  cakePrice: number;
  designPrice: number;
}
