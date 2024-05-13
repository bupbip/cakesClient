import {User} from "./User";
import {OrderItem} from "./OrderItem";

export class Order {
  constructor(
    public orderId?: number,
    public customer?: User,
    public confectioner?: User,
    public createdDate: Date = new Date(),
    public completeDate?: Date,
    public deliveryType?: string,
    public address?: string,
    public status?: string,
    public preferPrice?: number,
    public spentPrice?: number,
    public resultPrice?: number,
    public products: OrderItem[] = []
  ) {
  }
}
