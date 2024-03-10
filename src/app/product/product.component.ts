import {Component} from '@angular/core';
import {Product} from "../models/Product";
import {ProductService} from "../services/product.service";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  public products: Product[] = [];

  constructor(private productService: ProductService,
              private notificationService: NotificationService) {
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
  }

}
