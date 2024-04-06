import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../models/User";
import {NotificationService} from "../services/notification.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-confectioner',
  templateUrl: './confectioner.component.html',
  styleUrls: ['./confectioner.component.css']
})
export class ConfectionerComponent implements OnInit {
  public confectioners: User[] = [];
  private skip = 0;
  private limit = 6;

  constructor(private userService: UserService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
  }

  getAll(limit: number, skip: number) {
    this.userService.getConfectioners(skip, limit).subscribe(
      (confectioners: User[]) => {
        confectioners.forEach(u => {
          this.confectioners.push(u);
        });
      },
      error => {
        this.notificationService.showSnackBar(error.message);
      }
    );
  }

  onScroll(e: any) {
    if (e) {
      console.log("here");
      this.getAll(this.limit, this.skip);
      this.skip += this.limit;
      console.log(`skip - ${this.skip}`);
      console.log(`limit - ${this.limit}`);
    }
  }
}
