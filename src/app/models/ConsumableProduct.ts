import {Consumable} from "./Consumable";

export class ConsumableProduct {
  constructor(
    public consumable: Consumable,
    public count: number,
    public consumableProductId?: number
  ) {
  }

}
