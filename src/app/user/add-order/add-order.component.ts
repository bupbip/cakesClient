import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Order} from "../../models/Order";
import {OrderService} from "../../services/order.service";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  orderForm!: FormGroup;
  cakeForms: FormGroup[] = [];
  isOrderCreated = false;
  createdOrder?: Order;

  constructor(
    private dialogRef: MatDialogRef<AddOrderComponent>,
    private orderService: OrderService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.orderForm = this.createOrderForm();
  }

  createOrderForm(): FormGroup {
    return this.fb.group({
      customerName: [''],
      customerPhone: [''],
      customerInst: [''],
      orderDate: ['']
    });
  }

  public addCakeForm() {
    this.cakeForms.push(
      this.fb.group({
        cakeSize: ['', Validators.compose([Validators.required])],
        designRating: [''],
        cakePrice: ['', Validators.compose([Validators.required])],
        designPrice: ['', Validators.compose([Validators.required])]
      })
    );
  }

  submit(): void {
    const cakesData = this.cakeForms.map(cakeForm => {
      return {
        cakeSize: cakeForm.value.cakeSize,
        designRating: cakeForm.value.designRating,
        cakePrice: cakeForm.value.cakePrice,
        designPrice: cakeForm.value.designPrice
      };
    });

    const customer = {
      name: this.orderForm.value.customerName,
      phone: this.orderForm.value.customerPhone,
      instagram: this.orderForm.value.customerInst
    };

    const orderData = {
      customer: customer,
      orderDate: this.orderForm.value.orderDate,
      cakesData: cakesData
    }

    console.log(orderData);

    this.orderService.createOrder(orderData).subscribe(data => {
      console.log(data);

      this.notificationService.showSnackBar('Заказ успешно создан');
    }, () => {
      this.notificationService.showSnackBar('Произошла ошибка.');
    });
    this.dialogRef.close();
  }

  removeCakeForm(index: number) {
    this.cakeForms.splice(index, 1);
  }
}
