import {Component, OnInit} from '@angular/core';
import {Product} from "../models/Product";
import {ProductService} from "../services/product.service";
import {NotificationService} from "../services/notification.service";
import {CreateOrderComponent} from "../order/create-order/create-order.component";
import {TokenStorageService} from "../services/token-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {OrderService} from "../services/order.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public products: Product[] = [];
  private skip = 0;
  private limit = 6;

  constructor(private productService: ProductService,
              private notificationService: NotificationService,
              private tokenStorageService: TokenStorageService,
              private dialog: MatDialog,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
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

  getAll(limit: number, skip: number) {
    this.productService.getAllProducts(skip, limit).subscribe(
      (products: Product[]) => {
        products.forEach(p => {
          this.products.push(p);
        });
      },
      error => {
        this.notificationService.showSnackBar(error.message);
      }
    );
  }

  onScroll(e: any) {
    if (e) {
      console.log("here");
      this.getAll(this.limit, this.skip);
      this.skip += this.limit;
      console.log(`skip - ${this.skip}`);
      console.log(`limit - ${this.limit}`);
    }
  }

}
