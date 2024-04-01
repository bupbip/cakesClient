
export interface ProductType {
  productTypeId?: number;
  name: string;
  canOrder: boolean;
  canWeight: boolean;
  canCount: boolean;
  fillings: number[];
}
