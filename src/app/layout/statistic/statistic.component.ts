import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {Order} from "../../models/Order";
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  isUserDataLoaded = false;
  user?: User;
  isOrdersDataLoaded = false;
  orders?: Order[]
  
  ngOnInit(): void {
  }

}
