import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {RoleRequest} from "../models/RoleRequest";
import {Injectable} from "@angular/core";

const ROLEREQUEST_API = 'http://localhost:4302/api/v1/role-request/';

@Injectable({
  providedIn: 'root'
})
export class RolerequestService {

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) {
  }

  public getAllRequests(): Observable<RoleRequest[]> {
    const headers = {
      Authorization: 'Bearer ' + this.tokenStorage.getToken()
    };
    return this.http.get<RoleRequest[]>(ROLEREQUEST_API + 'get-all', {headers: headers});
  }

  public approve(request : RoleRequest): Observable<string> {
    return this.http.post<string>(ROLEREQUEST_API + 'approve', request);
  }

  public decline(request : RoleRequest): Observable<any> {
    return this.http.post<string>(ROLEREQUEST_API + 'decline', request);
  }
}
