import {Order} from "./Order";

export interface User {
  id: number;
  instagram: String;
  name: String;
  password: String;
  confirmPassword: String;
  phone?: String;
  info?: String;
  orders?: Order[];
}
