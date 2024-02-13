import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../services/token-storage.service";
import {Product} from "../models/Product";
import {ProductService} from "../services/product.service";
import {DomSanitizer} from "@angular/platform-browser";
import {NotificationService} from "../services/notification.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public products: Product[] = [];
  private username: String = '';

  constructor(private tokenStorageService: TokenStorageService,
              private productService: ProductService,
              private sanitizer: DomSanitizer,
              private notificationService: NotificationService,
              private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username') || '';

    this.productService.getAllUserProducts(this.username).subscribe(
      (products: Product[]) => {
        this.products = products.map(product => ({
          ...product,
          image: this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + product.image)

        }));
        console.log(products);
      },
      error => {
        this.notificationService.showSnackBar(error.message);
      }
    );
  }
}
