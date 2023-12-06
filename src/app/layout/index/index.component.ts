import {Component, OnInit} from '@angular/core';
import {Order} from "../../models/Order";
import {User} from "../../models/User";
import {OrderService} from "../../services/order.service";
import {UserService} from "../../services/user.service";
import {NotificationService} from "../../services/notification.service";
import {CakeService} from "../../services/cake.service";
import {MatDialog, MatDialogConfig, MatDialogModule} from "@angular/material/dialog";
import {AddOrderComponent} from "../../user/add-order/add-order.component";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isOrdersLoaded = false;
  orders?: Order[];
  isUserDataLoaded = false;
  user?: User;
  newOrder?: Order;
  showOrderForm: boolean = false;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private notificationService: NotificationService,
    private cakeService: CakeService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.orderService.getAllOrders()
      .subscribe(data => {
        this.orders = data;
        this.isOrdersLoaded = true;
      });
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.isUserDataLoaded = true;
      });
  }

  openOrderDialog() {
    const dialogCreateOrder = new MatDialogConfig();
    dialogCreateOrder.width = '500px';
    dialogCreateOrder.height = '700px';
    this.dialog.open(AddOrderComponent, dialogCreateOrder);
  }

  closeOrderDialog() {
    this.dialog.closeAll();
  }

  getCakesToOrders(orders: Order[]): void {
    orders.forEach(o => {
      this.cakeService.getCakesToOrder(o.id);
    })
  }


}
