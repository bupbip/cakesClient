export class Subscriptions {
  subscriptionId?: number;
  consumable?: boolean;
  monthly?: boolean;
  userId?: number;

  constructor(consumable: boolean, monthly: boolean, userId: number) {
    this.monthly = monthly;
    this.consumable = consumable;
    this.userId = userId;
  }
}
