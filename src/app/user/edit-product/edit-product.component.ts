import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../models/Product";
import {ProductType} from "../../models/ProductType";
import {Filling} from "../../models/Filling";
import {User} from "../../models/User";
import {TokenStorageService} from "../../services/token-storage.service";
import {UserService} from "../../services/user.service";
import {Consumable} from "../../models/Consumable";
import {StatisticService} from "../../services/statistic.service";
import {NotificationService} from "../../services/notification.service";
import {ConsumableProduct} from "../../models/ConsumableProduct";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productTypes: ProductType[] = [];
  toppings: Filling[] = [];

  editedProduct: Product;
  confectioner!: User;

  consumables: Consumable[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private statisticService: StatisticService,
    private notificationService: NotificationService
  ) {
    this.editedProduct = {...product};
    if (product == undefined) {
      this.editedProduct.consumableProducts = [];
      this.addEmptyConsumableProduct();
    }
  }


  ngOnInit() {
    this.userService.getUserByUsername(this.tokenStorageService.getUser().username).subscribe(
      (user: User) => {
        this.confectioner = user;
        console.log(user);
        if (this.confectioner.fillings) this.toppings = this.confectioner.fillings.slice();
        if (this.confectioner.productTypes) this.productTypes = this.confectioner.productTypes;
      },
      error => {
        this.notificationService.showSnackBar(error.message);
      }
    );

    this.statisticService.getAllConsumables().subscribe(
      (consumables: Consumable[]) => {
        console.log(consumables);
        this.consumables = consumables;
      },
      error => {
        this.notificationService.showSnackBar(error.message);
      }
    );
  }


  onSave(): void {
    this.product = this.editedProduct;
    this.dialogRef.close(this.product);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.editedProduct.image = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  getFillingsForProductType(productType: ProductType | undefined): void {
    if (productType && productType.fillings) {
      // @ts-ignore
      this.toppings = this.confectioner?.fillings.filter(filling => productType.fillings.includes(filling.fillingId));
    }
  }

  addEmptyConsumableProduct() {
    console.log(this.editedProduct);
    // @ts-ignore
    this.editedProduct.consumableProducts.push(new ConsumableProduct(new Consumable(), 0));
    console.log(this.editedProduct.consumableProducts);
  }

  removeConsumableProduct(index: number) {
    // @ts-ignore
    this.editedProduct.consumableProducts.splice(index, 1);
  }

}
