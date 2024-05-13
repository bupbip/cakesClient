import {Consumable} from "./Consumable";
import {Product} from "./Product";

export class ConsumableProduct {
  constructor(
    public consumable: Consumable,
    public count: number,
    public consumableProductId?: number,
    public product?: Product
  ) {
  }

}
