import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Filling} from "../models/Filling";
import {Observable} from "rxjs";

const FILLING_API = 'http://82.97.248.87:4302/api/v1/fillings/';

@Injectable({
  providedIn: 'root'
})
export class FillingsService {

  constructor(private http: HttpClient) {
  }

  saveFillings(fillings: Filling[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Filling[]>(FILLING_API + 'save-fillings', fillings, {headers});
  }

  deleteFilling(fillingId: number): Observable<any> {
    return this.http.post<any>(FILLING_API + 'delete-filling', fillingId);
  }
}
