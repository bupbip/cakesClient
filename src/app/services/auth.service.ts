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

  public login(user: User): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      inst: user.instagram,
      password: user.password
    })
  }

  public register(user: User): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      inst: user.instagram,
      name: user.name,
      password: user.password,
      confirmPassword: user.confirmPassword
    })
  }
}
