import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = 'http://82.97.248.87:4301/api/v1/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public login(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email: user.email,
      password: user.password
    });
  }

  public register(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      email: user.email,
      username: user.username,
      password: user.password,
      confirmPassword: user.confirmPassword
    });
  }
}
