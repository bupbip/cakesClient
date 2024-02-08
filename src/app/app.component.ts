import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./services/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Главная страница';

  isAuth: boolean = false;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isAuth = this.tokenStorageService.getUser() != null;
  }

  logout() {
    this.tokenStorageService.logOut();
  }
}
