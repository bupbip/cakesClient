import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cake} from "../models/Cake";

const CAKE_API = 'http://localhost:8080/api/cake/';

@Injectable({
  providedIn: 'root'
})
export class CakeService {

  constructor(private http: HttpClient) { }

  createCake(cake: Cake): Observable<any> {
    return this.http.post(CAKE_API + 'create', cake);
  }

  getCakesToOrder(orderId: number | undefined) {
    return this.http.get(CAKE_API + orderId + '/all');
  }
}
