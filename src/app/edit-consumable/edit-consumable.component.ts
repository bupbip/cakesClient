import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../services/notification.service";
import {Consumable} from "../models/Consumable";
import {StatisticService} from "../services/statistic.service";

@Component({
  selector: 'app-edit-consumable',
  templateUrl: './edit-consumable.component.html',
  styleUrls: ['./edit-consumable.component.css']
})
export class EditConsumableComponent {
  editedItem: Consumable;

  constructor(
    public dialogRef: MatDialogRef<EditConsumableComponent>,
    @Inject(MAT_DIALOG_DATA) public item: Consumable,
    public statisticService: StatisticService,
    private notificationService: NotificationService,
  ) {
    this.editedItem = {...item};
    console.log(this.editedItem);
  }

  approve() {
    console.log(this.editedItem);
    // @ts-ignore
    this.statisticService.updateConsumable(this.editedItem).subscribe(
      response => {
        this.notificationService.showSnackBar("Успешно обновлено.")
      },
      error => {
        console.log("Что-то пошло не так...");
      });
    this.dialogRef.close("approve");
  }

  undo() {
    this.dialogRef.close("undo");
  }

  decreaseCount() {
    // @ts-ignore
    this.editedItem.quantity -= 1;
  }

  increaseCount() {
    // @ts-ignore
    this.editedItem.quantity += 1;
  }
}

