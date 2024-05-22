import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/Product";
import {TokenStorageService} from "./token-storage.service";

const PRODUCTS_API = 'http://82.97.248.87:4302/api/v1/product/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) {
  }

  public getAllProducts(skip: number, limit: number): Observable<Product[]> {
    let params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());

    return this.http.get<Product[]>(PRODUCTS_API + 'get-all', {params: params});
  }

  public getAllUserProducts(username: String): Observable<Product[]> {
    return this.http.get<Product[]>(`${PRODUCTS_API}get-all?username=${username}`);
  }

  public saveProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.tokenStorage.getToken(),
      'Content-Type': 'application/json'
    });
    return this.http.post<Product>(PRODUCTS_API + 'save-product', product, {headers: headers});
  }

  public deleteProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(PRODUCTS_API + 'delete-product', product);
  }

  public deleteProductType(productTypeId: number): Observable<any> {
    return this.http.post<any>(PRODUCTS_API + 'delete-product-type', productTypeId);
  }
}
