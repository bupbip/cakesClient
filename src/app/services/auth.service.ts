import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";

const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      inst: user.inst,
      password: user.password
    })
  }

  public register(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      inst: user.inst,
      name: user.name,
      password: user.password,
      confirmPassword: user.confirmPassword
    })
  }
}
