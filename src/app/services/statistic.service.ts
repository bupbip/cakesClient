import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {Statistic} from "../models/Statistic";
import {User} from "../models/User";
import {Consumable} from "../models/Consumable";

const STATISTIC_API = 'http://82.97.248.87:4304/api/v1/statistic/';
const CONSUMABLE_API = 'http://82.97.248.87:4304/api/v1/consumable/';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) {
  }

  public getAll(user: User, year: number): Observable<Statistic[]> {
    let params = new HttpParams()
      .set('userId', user.userId)
      .set('year', year);
    return this.http.get<Statistic[]>(STATISTIC_API + 'get-statistic', {params: params});
  }

  public getAllConsumables(): Observable<Consumable[]> {
    const username = this.tokenStorage.getUser().username;
    let params = new HttpParams()
      .set('username', username);
    return this.http.get<Consumable[]>(CONSUMABLE_API + 'get-consumable', {params: params});
  }

  public deleteConsumable(consumable: Consumable): Observable<String> | undefined {
    if (consumable.consumableId != undefined) {
      let params = new HttpParams()
        .set('consumableId', consumable.consumableId)
      return this.http.delete<String>(CONSUMABLE_API + 'delete-consumable', {params: params});
    }
    return undefined;
  }

  public updateConsumable(consumable: Consumable): Observable<Consumable> {
    return this.http.post<Consumable>(CONSUMABLE_API + 'update-consumable', consumable);
  }
}
