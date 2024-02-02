export class Product {
  constructor(
    public productId: number,
    public name: string,
    public price: number,
    public count: number,
    public weight: number,
    public topping: string,
    public comment: string,
    public type: string,
    // public image: HTMLImageElement
  ) {}
}
