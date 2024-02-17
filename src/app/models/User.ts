import {Order} from "./Order";
import {Social} from "./Social";

export interface User {
  id: number;
  name: String;
  email: String;
  password: String;
  confirmPassword: String;
  description: String;
  username: String;
  orders?: Order[];
  socialNetworks: Social[];
  image: any;
}
