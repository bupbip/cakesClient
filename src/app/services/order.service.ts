import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../models/Order";
import {Observable} from "rxjs";

const ORDER_API = 'http://localhost:8080/api/order/';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  createOrder(order: any): Observable<any> {
    return this.http.post(ORDER_API + 'create', order);
  }

  getAllOrders(): Observable<any> {
    return this.http.get(ORDER_API + 'all');
  }

/*  getAllOrdersOnDate(date: Date): Observable<any> {
    return this.http.get()
  }*/

  // addCakesToOrder
}
