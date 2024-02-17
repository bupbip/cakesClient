import {Component} from '@angular/core';
import {Product} from "../models/Product";
import {ProductService} from "../services/product.service";
import {NotificationService} from "../services/notification.service";
import {NgxImageCompressService} from "ngx-image-compress";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  public products: Product[] = [];

  constructor(private productService: ProductService,
              private notificationService: NotificationService,
              private imageCompress: NgxImageCompressService,
              private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.products = products.map(product => ({
          ...product,
          // image: this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + product.image)

        }));
      },
      error => {
        this.notificationService.showSnackBar(error.message);
      }
    );
  }

}
