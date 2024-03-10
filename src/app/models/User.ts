import {Order} from "./Order";
import {Social} from "./Social";

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
}
