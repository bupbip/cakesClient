import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../models/Order";
import {Observable} from "rxjs";
import {User} from "../models/User";

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

  getAllOrdersByConfectioner(user: User | undefined): Observable<any> {
    // @ts-ignore
    return this.http.get(ORDER_API + 'all?user=' + user?.email)
  }

/*  getAllOrdersOnDate(date: Date): Observable<any> {
    return this.http.get()
  }*/

  // addCakesToOrder
}
