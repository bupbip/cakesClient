import {Component, Inject, OnInit} from '@angular/core';
import {Product} from "../models/Product";
import {OrderItem} from "../models/OrderItem";
import {Order} from "../models/Order";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TokenStorageService} from "../services/token-storage.service";
import {ProductService} from "../services/product.service";
import {UserService} from "../services/user.service";
import {DomSanitizer} from "@angular/platform-browser";
import {NotificationService} from "../services/notification.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../models/User";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  foods: any[] = [
    {value: 'COOKIE', viewValue: 'Печенье'},
    {value: 'CAKE', viewValue: 'Торт'},
    {value: 'CUPCAKE', viewValue: 'Пирожные'},
  ];

  toppings: any[] = [
    {value: 'CHOCOLATE', viewValue: 'Шоколад'},
    {value: 'STRAWBERRY', viewValue: 'Клубника'},
    {value: 'MANGO', viewValue: 'Манго'},
  ];

  deliveryTypes: any[] = [
    {value: 'DELIVERY', viewValue: 'Доставка'},
    {value: 'PICKUP', viewValue: 'Самовывоз'}
  ];

  orderItems: OrderItem[] = [];
  orderConfectioner: User;
  completeDate?: Date;
  deliveryType?: string;
  address?: string;

  constructor(
    public dialogRef: MatDialogRef<OrderComponent>,
    @Inject(MAT_DIALOG_DATA) public confectioner: User,
    private tokenStorageService: TokenStorageService
  ) {
    console.log(confectioner);
    this.orderConfectioner = {...confectioner};
  }

  ngOnInit() {
    this.addProduct();
  }

  addProduct() {
    this.orderItems.push(new OrderItem(new Product(), 1));
  }

  removeProduct(index: number) {
    this.orderItems.splice(index, 1);
  }

  decreaseCount(item: OrderItem) {
    if (item.count > 1) {
      item.count--;
    }
  }

  increaseCount(item: OrderItem) {
    item.count++;
  }

  makeOrder() {
    const currentUser = this.tokenStorageService.getUser();
    const order = new Order (
      undefined,
      currentUser,
      this.orderConfectioner,
      new Date(),
      this.completeDate,
      this.deliveryType,
      this.address
    );
    console.log(order);
  }

  onFileSelected(event: any, item: OrderItem) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          item.product.image = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
