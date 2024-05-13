import {Component, Inject} from '@angular/core';
import {Product} from "../../models/Product";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../services/product.service";
import {NotificationService} from "../../services/notification.service";
import {Filling} from "../../models/Filling";
import {ProductType} from "../../models/ProductType";
import {Consumable} from "../../models/Consumable";

export type DeletableItem = Product | Filling | ProductType | Consumable;

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {
  deletedItem: DeletableItem;
  constructor(
    public dialogRef: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public item: DeletableItem,
    public productService: ProductService,
    private notificationService: NotificationService,
  ) {
    this.deletedItem = {...item};
  }

  deleteItem() {
    console.log(typeof this.deletedItem);
    if ('productId' in this.deletedItem) {
      this.productService.deleteProduct(this.deletedItem).subscribe(
        response => {
          this.notificationService.showSnackBar("Успешно удалено.")
        },
        error => {
          console.log("Что-то пошло не так...");
        });
    } else if ('fillingId' in this.deletedItem) {
      // @ts-ignore
      this.fillingService.deleteFilling(this.deletedItem.fillingId).subscribe(
        (message: string) => {
          this.notificationService.showSnackBar(message);
        },
        (error: string) => {
          console.log("Ошибка удаления начинки.");
        });
    } else if ('productTypeId' in this.deletedItem) {
      // @ts-ignore
      this.productService.deleteProductType(this.deletedItem.productTypeId).subscribe(
        message => {
          this.notificationService.showSnackBar(message)
        },
        error => {
          this.notificationService.showSnackBar(error);
        });
    }
    this.dialogRef.close("delete");
  }

  undo() {
    this.dialogRef.close("undo");
  }
}
