import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../models/User";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../services/notification.service";
import {Subscriptions} from "../models/Subscriptions";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-mailsubscribe',
  templateUrl: './mailsubscribe.component.html',
  styleUrls: ['./mailsubscribe.component.css']
})
export class MailsubscribeComponent implements OnInit {

  user?: User;
  username: number;
  subscriptions?: Subscriptions;

  constructor(
    public dialogRef: MatDialogRef<MailsubscribeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    public userService: UserService,
    private notificationService: NotificationService,
  ) {
    this.username = data;
  }

  ngOnInit() {
    // @ts-ignore
    this.userService.getUserByUsername(this.username).subscribe(user => {
      this.user = user;
      console.log(user);
      if (user.subscriptions == undefined) {
        user.subscriptions = new Subscriptions(false, false, user.userId);
      }
      this.subscriptions = user.subscriptions;
    });
  }

  apply() {
    this.userService.saveUser(this.user).subscribe(
      response => {
        this.dialogRef.close(true);
      },
      error => {
        this.notificationService.showSnackBar("Не удалось оформить подписку. Попробуйте позднее.");
      });
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
