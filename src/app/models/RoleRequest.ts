import {User} from "./User";
import {Timestamp} from "rxjs";

export interface RoleRequest {
  roleRequestId: number;
  user: User;
  requestDatetime: Date;
}
