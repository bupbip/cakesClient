import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/Product";
import {TokenStorageService} from "./token-storage.service";

const PRODUCTS_API = 'http://localhost:4302/api/v1/product/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) {
  }

  public getAllProducts(): Observable<Product[]> {
    const headers = {
      Authorization: 'Bearer ' + this.tokenStorage.getToken()
    };
    return this.http.get<Product[]>(PRODUCTS_API + 'get-all', {headers: headers});
  }

  public getAllUserProducts(username : String): Observable<Product[]> {
    return this.http.get<Product[]>(`${PRODUCTS_API}get-all?username=${username}`);
  }
}
