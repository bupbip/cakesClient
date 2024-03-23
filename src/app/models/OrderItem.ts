import {Product} from "./Product";

export class OrderItem {
  constructor(
    public product: Product,
    public quantity: number,
    public resultImage?: any,
    public orderItemId?: number
  ) {}
}
