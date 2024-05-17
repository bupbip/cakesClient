import {User} from "./User";

export interface RoleRequest {
  roleRequestId: number;
  user: User;
  requestDatetime: Date;
}
