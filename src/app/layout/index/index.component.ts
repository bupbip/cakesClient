import {Component} from '@angular/core';
import {Order} from "../../models/Order";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {NotificationService} from "../../services/notification.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  orders?: Order[];
  user?: User;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
  }

}
