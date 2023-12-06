import {Order} from "./Order";

export interface User {
  id: number;
  name: String;
  email: String;
  password: String;
  confirmPassword: String;
  username: String;
  orders?: Order[];
}
