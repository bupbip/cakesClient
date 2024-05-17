import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Order} from "../models/Order";
import {Observable} from "rxjs";
import {User} from "../models/User";

const ORDER_API = 'http://localhost:4303/api/v1/order/';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  statuses: any[] = [
    {value: 'CREATED', viewValue: 'Создан'},
    {value: 'APPLIED', viewValue: 'Утверждён'},
    {value: 'DECLINED', viewValue: 'Отклонён'},
    {value: 'HALF_PAID', viewValue: 'Оплачено 50%'},
    {value: 'PAID', viewValue: 'Оплачено 100%'},
    {value: 'DELIVERED', viewValue: 'Выполнен'},
    {value: 'CANCELLED', viewValue: 'Отменён'}
  ];

  constructor(private http: HttpClient) {
  }

  createOrder(order: Order): Observable<any> {
    return this.http.post(ORDER_API + 'save-order', order);
  }

  getAllOrdersByUser(user: User): Observable<any> {
    return this.http.get(ORDER_API + 'all?userId=' + user.userId);
  }

  getAllStatuses() {
    return this.statuses;
  }

  getStatusView(status: string | undefined) {
    return this.statuses.find(s => s.value === status).viewValue;
  }
}
