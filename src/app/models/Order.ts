import { User } from "./User";

export class Order {
  constructor(
    public id?: number,
    public customer?: User,
    public confectioner?: User,
    public createdDate: Date = new Date(),
    public completeDate?: Date,
    public deliveryType?: string,
    public address?: string
  ) {}
}
