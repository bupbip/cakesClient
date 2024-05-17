import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {TokenStorageService} from "../services/token-storage.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

/**
 * Сервис для проверки прав доступа к странице
 */
@Injectable({
  providedIn: 'root'
})
export class ConfectionerGuardService implements CanActivate {

  constructor(private router: Router,
              private tokenService: TokenStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.tokenService.getUser().role === "ROLE_CONFECTIONER" || this.tokenService.getUser().role === "ROLE_ADMIN";
  }
}
