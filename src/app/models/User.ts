import {Order} from "./Order";
import {Social} from "./Social";
import {Filling} from "./Filling";
import {ProductType} from "./ProductType";

export interface User {
  userId: number;
  name: String;
  email: String;
  password: String;
  confirmPassword: String;
  description: String;
  username: String;
  role: String;
  orders?: Order[];
  socialNetworks: Social[];
  image: any;
  fillings?: Filling[];
  productTypes?: ProductType[];
}
