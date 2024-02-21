import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";
import {Product} from "../models/Product";
import {TokenStorageService} from "./token-storage.service";

const USER_API = 'http://localhost:4302/api/v1/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) {
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(USER_API + id);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(USER_API);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(USER_API + 'get?username=' + username);
  }

  getConfectioners(): Observable<User[]> {
    return this.http.get<User[]>(USER_API + 'get-confectioners');
  }

  saveUser(user: User | undefined) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.tokenStorage.getToken(),
      'Content-Type': 'application/json'
    });
    return this.http.post<Product>(USER_API + 'save-user', user, {headers: headers});
  }
}
