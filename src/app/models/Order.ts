import { User } from "./User";
import {OrderItem} from "./OrderItem";

export class Order {
  public spentPrice?: number;
  public resultPrice?: number;
  constructor(
    public orderId?: number,
    public customer?: User,
    public confectioner?: User,
    public createdDate: Date = new Date(),
    public completeDate?: Date,
    public deliveryType?: string,
    public address?: string,
    public status?: string,
    public products: OrderItem[] = []
  ) {
  }
}
