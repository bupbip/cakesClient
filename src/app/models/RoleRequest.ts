import {User} from "./User";

export class RoleRequest {
  roleRequestId?: number;
  user?: User;
  requestDatetime?: Date;

  constructor(user: User, requestDatetime: Date) {
    this.user = user;
    this.requestDatetime = requestDatetime;
  }
}
