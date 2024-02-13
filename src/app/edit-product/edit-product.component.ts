import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

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

  productImage: string | ArrayBuffer | null = null;
  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Реализуйте сохранение изменений продукта здесь
    // После сохранения изменений, закройте модальное окно
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.productImage = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
