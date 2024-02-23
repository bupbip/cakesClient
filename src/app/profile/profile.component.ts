import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../services/token-storage.service";
import {Product} from "../models/Product";
import {ProductService} from "../services/product.service";
import {DomSanitizer} from "@angular/platform-browser";
import {NotificationService} from "../services/notification.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {EditProductComponent} from "../edit-product/edit-product.component";
import {MatDialog} from "@angular/material/dialog";
import {OrderComponent} from "../order/order.component";

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
              private route: ActivatedRoute) {
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
    const dialogRef = this.dialog.open(OrderComponent, {
      width: 'auto',
      height: '1000px',
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) return;
      this.productService.saveProduct(result).subscribe(
        response => {

        },
        error => {
          console.log("error");
        });
    })
  };

}
