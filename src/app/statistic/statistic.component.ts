import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../services/notification.service";
import {Statistic} from "../models/Statistic";
import {StatisticService} from "../services/statistic.service";
import {User} from "../models/User";
import {Consumable} from "../models/Consumable";
import {TokenStorageService} from "../services/token-storage.service";
import {EditConsumableComponent} from "../edit-consumable/edit-consumable.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteProductComponent} from "../user/delete-product/delete-product.component";
import {MailsubscribeComponent} from "../mailsubscribe/mailsubscribe.component";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  statistic: Statistic[] = [];
  user: User = this.tokenStorage.getUser();
  year: number;
  currMonth: number;
  months: any[] = [
    {value: 1, viewValue: 'Янв', fullValue: 'январь'},
    {value: 2, viewValue: 'Февр', fullValue: 'февраль'},
    {value: 3, viewValue: 'Март', fullValue: 'март'},
    {value: 4, viewValue: 'Апр', fullValue: 'апрель'},
    {value: 5, viewValue: 'Май', fullValue: 'май'},
    {value: 6, viewValue: 'Июнь', fullValue: 'июнь'},
    {value: 7, viewValue: 'Июль', fullValue: 'июль'},
    {value: 8, viewValue: 'Авг', fullValue: 'август'},
    {value: 9, viewValue: 'Сент', fullValue: 'сентябрь'},
    {value: 10, viewValue: 'Окт', fullValue: 'октябрь'},
    {value: 11, viewValue: 'Нояб', fullValue: 'ноябрь'},
    {value: 12, viewValue: 'Дек', fullValue: 'декабрь'},
  ];


  consumables: Consumable[] = [];

  constructor(private dialog: MatDialog,
              private statisticService: StatisticService,
              private notificationService: NotificationService,
              private tokenStorage: TokenStorageService,
              private userService: UserService) {
    this.year = new Date().getFullYear();
    this.currMonth = new Date().getMonth() + 1;
  }

  ngOnInit(): void {
    this.statisticService.getAll(this.user, this.year).subscribe(
      (statistic: Statistic[]) => {
        this.statistic = statistic;
        console.log(statistic);
        for (let i = 1; i <= 12; i++) {
          const existingStat = this.statistic.find(stat => stat.month === i);
          if (!existingStat) {
            this.statistic.push({month: i});
          }
        }
        // @ts-ignore
        this.statistic.sort((a, b) => a.month - b.month);
      },
      error => {
        this.notificationService.showSnackBar(error.message);
      }
    );
    this.statisticService.getAllConsumables().subscribe(
      (consumables: Consumable[]) => {
        console.log(consumables);
        this.consumables = consumables;
      },
      error => {
        this.notificationService.showSnackBar(error.message);
      }
    );
  }

  calculateHeight(value: number | undefined): number {
    const maxHeight = 370;
    const scaleFactor = 0.005;

    if (value !== undefined) {
      return Math.min(value * scaleFactor, maxHeight);
    } else {
      return 0;
    }
  }

  openDeleteModal(consumable: Consumable): void {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      width: 'auto',
      height: 'auto',
      data: consumable
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "delete") {
        this.statisticService.deleteConsumable(consumable)?.subscribe(
          (result: String) => {
            console.log(result);
          },
          error => {
            this.notificationService.showSnackBar("Удалено.");
          }
        );
        this.consumables = this.consumables.filter(cons => cons !== consumable)
      }
    });
  }

  openEditModal(consumable: Consumable): void {
    const dialogRef = this.dialog.open(EditConsumableComponent, {
      width: 'auto',
      height: 'auto',
      data: consumable
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "approve") {
        window.location.reload();
      }
    });
  }

  addConsumable() {
    const emptyConsumable: Consumable = {
      name: '',
      quantity: undefined,
      threshold: undefined,
      quantityType: '',
      userId: this.user.userId
    };
    this.consumables.push(emptyConsumable);
  }

  emailSubscribe(): void {
    this.dialog.open(MailsubscribeComponent, {
      width: 'auto',
      height: 'auto',
      data: this.user.username
    });
  };

}
