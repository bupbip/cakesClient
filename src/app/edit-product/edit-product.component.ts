import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../models/Product";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  foods: any[] = [
    {value: 'COOKIE', viewValue: 'Печенье'},
    {value: 'CAKE', viewValue: 'Торт'},
    {value: 'CUPCAKE', viewValue: 'Пирожные'},
  ];

  toppings: any[] = [
    {value: 'CHOCOLATE', viewValue: 'Шоколад'},
    {value: 'STRAWBERRY', viewValue: 'Клубника'},
    {value: 'MANGO', viewValue: 'Манго'},
  ];

  editedProduct: Product;
  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {
    console.log(product);
    this.editedProduct = {...product};
  }

  onSave(): void {
    this.product = this.editedProduct;
    console.log(this.product);
    console.log(this.editedProduct);
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
}
