import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {Product} from "../../models/Product";
import {ProductService} from "../../services/product.service";
import {DomSanitizer} from "@angular/platform-browser";
import {NotificationService} from "../../services/notification.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {EditProductComponent} from "../edit-product/edit-product.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateOrderComponent} from "../../order/create-order/create-order.component";
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/Order";
import {FeedbackComponent} from "../../feedback/feedback.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public products: Product[] = [];
  private username: string = '';
  public user: User | undefined;

  constructor(private dialog: MatDialog,
              private tokenStorageService: TokenStorageService,
              private productService: ProductService,
              private userService: UserService,
              private sanitizer: DomSanitizer,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username') || '';
    this.userService.getUserByUsername(this.username).subscribe(
      (user: User) => {
        this.user = user;
        console.log(user);
      },
      error => {
        // this.notificationService.showSnackBar(error.message);
      }
    );

    this.productService.getAllUserProducts(this.username).subscribe(
      (products: Product[]) => {
        this.products = products;
        console.log(products);
      },
      error => {
        // this.notificationService.showSnackBar(error.message);
      }
    );
  }

  makeOrder(): void {
    let usr = this.user;
    const dialogRef = this.dialog.open(CreateOrderComponent, {
      width: 'auto',
      height: '1000px',
      data: {usr}
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

  leaveFeedback(user: User | undefined) {
    // const orderCopy: Order = JSON.parse(JSON.stringify(order));
    const dialogRef = this.dialog.open(FeedbackComponent, {
      width: 'auto',
      height: 'auto',
      data: {userTo: user}
    });
  }

}
