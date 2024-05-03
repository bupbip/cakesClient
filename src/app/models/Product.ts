import {Filling} from "./Filling";
import {ProductType} from "./ProductType";
import {Consumable} from "./Consumable";

export class Product {
  constructor(
    public productId?: number,
    public name?: string,
    public price?: number,
    public count?: number,
    public weight?: number,
    public topping?: Filling,
    public comment?: string,
    public productType?: ProductType,
    public ownerUsername?: string,
    public image?: any,
    public consumables?: Consumable[]
  ) {}
}
