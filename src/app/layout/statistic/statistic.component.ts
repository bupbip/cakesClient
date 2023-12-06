import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {Order} from "../../models/Order";
import {OrderService} from "../../services/order.service";
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  isUserDataLoaded = false;
  user?: User;
  isOrdersDataLoaded = false;
  orders?: Order[]


  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
  }
  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.isUserDataLoaded = true;
      });
    this.orderService.getAllOrdersByConfectioner(this.user)
      .subscribe(data => {
        this.orders = data;
        this.isOrdersDataLoaded = true;
      });
  }

}
