import {Injectable} from '@angular/core';
import {User} from "../models/User";
import {BehaviorSubject} from "rxjs";

const TOKEN_KEY = 'auth-token'
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private isAuthenticated = new BehaviorSubject<boolean>(this.getUser() != null);

  constructor() {
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }


  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  public saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.isAuthenticated.next(this.getUser() != null);
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY)!);
  }

  logOut(): void {
    window.sessionStorage.clear();
    this.isAuthenticated.next(this.getUser() != null);
    window.location.reload();
  }

  getIsAuthenticated(): BehaviorSubject<boolean> {
    return this.isAuthenticated;
  }
}
