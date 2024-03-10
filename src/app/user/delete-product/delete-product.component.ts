import {Component, Inject} from '@angular/core';
import {Product} from "../../models/Product";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../services/product.service";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {
  deletedProduct: Product;
  constructor(
    public dialogRef: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product,
    public productService: ProductService,
    private notificationService: NotificationService,
  ) {
    console.log(product);
    this.deletedProduct = {...product};
  }

  deleteProduct() {
    this.productService.deleteProduct(this.deletedProduct).subscribe(
      response => {
        this.notificationService.showSnackBar("Успешно удалено.")
      },
      error => {
        console.log("Что-то пошло не так...");
      });
    this.dialogRef.close();
  }

  undo() {
    this.dialogRef.close();
  }
}
