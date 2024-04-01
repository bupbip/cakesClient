import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/Product";
import {TokenStorageService} from "./token-storage.service";
import {ProductType} from "../models/ProductType";

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
