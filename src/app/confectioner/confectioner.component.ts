import {Component, OnInit} from '@angular/core';
import {User} from "../models/User";
import {NotificationService} from "../services/notification.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-confectioner',
  templateUrl: './confectioner.component.html',
  styleUrls: ['./confectioner.component.css']
})
export class ConfectionerComponent implements OnInit {
  public confectioners: User[] = [];

  constructor(private userService: UserService,
              private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.userService.getConfectioners().subscribe(
      (confectioners: User[]) => {
        this.confectioners = confectioners;
      },
      error => {
        this.notificationService.showSnackBar(error.message);
      }
    );
  }
}
