import {Component, OnInit} from '@angular/core';
import {Order} from "../../models/Order";
import {NotificationService} from "../../services/notification.service";
import {OrderService} from "../../services/order.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {User} from "../../models/User";
import {CreateOrderComponent} from "../create-order/create-order.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders?: Order[] = [];
  user: User;

  constructor(private dialog: MatDialog,
              private orderService: OrderService,
              private tokenStorageService: TokenStorageService,
              private notificationService: NotificationService) {
    this.user = this.tokenStorageService.getUser();
  }

  ngOnInit(): void {
    console.log(this.tokenStorageService.getUser());
    if (this.user.role === "ROLE_CONFECTIONER") {
      this.orderService.getAllOrdersByUser(this.user).subscribe(
        (orders: Order[]) => {
          this.orders = orders;
          console.log(orders);
        },
        error => {
          this.notificationService.showSnackBar(error.message);
        }
      );
    }
  };

  editOrder(order: Order): void {
    const orderCopy: Order = JSON.parse(JSON.stringify(order));
    const dialogRef = this.dialog.open(CreateOrderComponent, {
      width: 'auto',
      height: '1000px',
      data: {order: orderCopy}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) return;
      this.orderService.createOrder(result).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log("error");
        });
    })
  };

  getStatusView(status: string | undefined) {
    return this.orderService.getStatusView(status);
  }

}
