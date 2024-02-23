import {Product} from "./Product";

export class OrderItem {
  constructor(
    public product: Product,
    public count: number
  ) {}
}
