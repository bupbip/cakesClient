import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../services/token-storage.service";
import {Product} from "../models/Product";
import {ProductService} from "../services/product.service";
import {DomSanitizer} from "@angular/platform-browser";
import {NotificationService} from "../services/notification.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../models/User";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public products: Product[] = [];
  private username: string = '';
  public user: User | undefined;

  constructor(private tokenStorageService: TokenStorageService,
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
}
