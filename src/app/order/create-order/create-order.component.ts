import {Component, Inject} from '@angular/core';
import {Product} from "../../models/Product";
import {OrderItem} from "../../models/OrderItem";
import {Order} from "../../models/Order";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TokenStorageService} from "../../services/token-storage.service";
import {DatePipe} from "@angular/common";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent {
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

  deliveryTypes: any[] = [
    {value: 'DELIVERY', viewValue: 'Доставка'},
    {value: 'PICKUP', viewValue: 'Самовывоз'}
  ];

  statuses: any[] = this.orderService.getAllStatuses();

  order: Order = new Order();

  constructor(
    public dialogRef: MatDialogRef<CreateOrderComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private tokenStorageService: TokenStorageService,
    private orderService: OrderService,
    private datePipe: DatePipe
  ) {
    console.log(data);
    if (data.usr != undefined) {
      this.order.confectioner = {...data.usr};
      this.addProduct();
    } else if (data.order != undefined) {
      this.order = data.order;
    }
  }

  addProduct() {
    this.order.products.push(new OrderItem(new Product(), 1));
  }

  removeProduct(index: number) {
    // @ts-ignore
    this.order.products.splice(index, 1);
  }

  decreaseCount(item: OrderItem) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  increaseCount(item: OrderItem) {
    item.quantity++;
  }

  makeOrder() {
    const currentUser = this.tokenStorageService.getUser();
    let formattedCompleteDate: Date | undefined;

    if (this.order.completeDate) {
      const transformedDate = this.datePipe.transform(this.order.completeDate, 'yyyy-MM-ddTHH:mm:ss');
      if (transformedDate) {
        formattedCompleteDate = new Date(transformedDate);
      }
    }

    console.log(this.order);
    this.dialogRef.close(this.order);
  }

  onFileSelected(event: any, item: OrderItem, imageType: string) {
    console.log(item);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          if (imageType === 'reference') {
            item.reference = e.target.result as string;
          } else if (imageType === 'result') {
            item.product.image = e.target.result as string;
          }
        }
      };
      reader.readAsDataURL(file);
    }
  }

}
