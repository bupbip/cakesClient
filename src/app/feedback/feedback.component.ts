import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TokenStorageService} from "../services/token-storage.service";
import {OrderService} from "../services/order.service";
import {UserService} from "../services/user.service";
import {StatisticService} from "../services/statistic.service";
import {NotificationService} from "../services/notification.service";
import {User} from "../models/User";
import {Consumable} from "../models/Consumable";
import {Order} from "../models/Order";
import {Feedback} from "../models/Feedback";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  rating: number = 0;
  feedback: Feedback;
  order: Order;
  userTo: User;

  constructor(
    public dialogRef: MatDialogRef<FeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tokenStorageService: TokenStorageService,
    private orderService: OrderService,
    private userService: UserService,
    private statisticService: StatisticService,
    private notificationService: NotificationService
  ) {
    console.log(data);
    this.order = data.order;
    this.userTo = data.userTo;
    this.feedback = new Feedback();
  }

  approve() {
    if (this.order != undefined) {
      console.log(this.order);
      this.orderService.createOrder(this.order).subscribe(response => {
        this.notificationService.showSnackBar("Спасибо за ваше мнение!")
      },
        error => {
          console.log("Не удалось оставить отзыв, пожалуйста попробуйте позже.");
        }
      );
    } else if (this.userTo != undefined) {
      // console.log(this.userTo);
      this.feedback.userFrom = this.tokenStorageService.getUser();
      this.feedback.rating = this.rating;
      this.feedback.createdDate = new Date();
      if (this.userTo.feedbacksTo) {
        this.userTo.feedbacksTo = [];
      }
      this.userTo.feedbacksTo?.push(this.feedback);
      console.log(this.feedback);
      console.log(this.userTo);
      console.log(this.userTo.feedbacksTo);
      this.userService.saveUser(this.userTo).subscribe(response => {
          this.notificationService.showSnackBar("Спасибо за ваше мнение!")
        },
        error => {
          console.log("Не удалось оставить отзыв, пожалуйста попробуйте позже.");
        }
      );
    }
    this.dialogRef.close();
  }
  undo() {
    this.dialogRef.close();
  }
}
