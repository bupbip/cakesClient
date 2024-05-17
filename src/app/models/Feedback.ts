import {User} from "./User";

export class Feedback {
  feedbackId?: number;
  userFrom?: User;
  userTo?: number;
  rating?: number;
  comment?: string;
  createdDate?: Date;
}
