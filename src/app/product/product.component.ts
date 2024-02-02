import { Component } from '@angular/core';
import {Product} from "../models/Product";
import {ProductService} from "../services/product.service";
import {NotificationService} from "../services/notification.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  public products: Product[] = [];

  constructor(private productService: ProductService,
              private notificationService: NotificationService,
              private sanitizer: DomSanitizer) {}

  // ngOnInit(): void {
  //   this.productService.getAllProducts().subscribe(
  //     (products: Product[]) => {
  //       this.products = products.map(product => ({
  //         ...product,
  //         image: this.sanitizer.bypassSecurityTrustUrl(
  //           'data:image/png;base64,' + product.image
  //         ) as SafeUrl
  //       }));
  //     },
  //     error => {
  //       this.notificationService.showSnackBar(error.message);
  //     }
  //   );
  // }

  // public products: Product[] = [
  //   new Product(1,"Торт",5000, 10, 0.5, 'Шоколад', 'Вкусный продукт 1', 'Тип продукта 1', new Image()),
  //   new Product(2, "Пирожное", 7000, 15, 0.7, 'Фрукты', 'Вкусный продукт 2', 'Тип продукта 2', new Image()),
  //   new Product(3, "Торт", 8000, 20, 1.0, 'Орехи', 'Вкусный продукт 3', 'Тип продукта 3', new Image()),
  //   new Product(4, "Вафли", 500, 3, 1.0, 'Орехи', 'Вкусный продукт 4', 'Тип продукта 3', new Image()),
  // ];

}
