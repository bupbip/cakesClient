export class Product {
  constructor(
    public productId?: number,
    public name?: string,
    public price?: number,
    public count?: number,
    public weight?: number,
    public topping?: string,
    public comment?: string,
    public type?: string,
    public image?: any
  ) {}
}
/*
export interface Product {
  productId: number;
  name: string;
  price: number;
  count: number;
  weight: number;
  topping: string;
  comment: string;
  type: string;
  image: any
}
*/
