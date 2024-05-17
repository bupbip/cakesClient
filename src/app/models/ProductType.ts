export class ProductType {
  productTypeId?: number;
  name?: string;
  canOrder?: boolean;
  canWeight?: boolean;
  canCount?: boolean;
  fillings?: number[];

  constructor(
    productTypeId?: number,
    name?: string,
    canOrder?: boolean,
    canWeight?: boolean,
    canCount?: boolean,
    fillings?: number[]
  ) {
  }
}
