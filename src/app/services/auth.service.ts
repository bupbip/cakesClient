import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";

const AUTH_API = 'http://localhost:8080/api/v1/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email: user.email,
      password: user.password
    });
  }

  public register(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      email: user.email,
      name: user.name,
      password: user.password,
      confirmPassword: user.confirmPassword
    });
  }
}
