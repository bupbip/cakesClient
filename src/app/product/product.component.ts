import {Component, OnInit} from '@angular/core';
import {Product} from "../models/Product";
import {ProductService} from "../services/product.service";
import {NotificationService} from "../services/notification.service";
import {CreateOrderComponent} from "../order/create-order/create-order.component";
import {TokenStorageService} from "../services/token-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {OrderService} from "../services/order.service";
import {Order} from "../models/Order";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public products: Product[] = [];

  constructor(private productService: ProductService,
              private notificationService: NotificationService,
              private tokenStorageService: TokenStorageService,
              private dialog: MatDialog,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
        console.log(products);
      },
      error => {
        this.notificationService.showSnackBar(error.message);
      }
    );
  };

  makeOrder(product: Product): void {
    const dialogRef = this.dialog.open(CreateOrderComponent, {
      width: 'auto',
      height: '1000px',
      data: {product}
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

}
