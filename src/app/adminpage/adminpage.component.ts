import {Component, OnInit} from '@angular/core';
import {Product} from "../models/Product";
import {ProductService} from "../services/product.service";
import {NotificationService} from "../services/notification.service";
import {TokenStorageService} from "../services/token-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {OrderService} from "../services/order.service";
import {RoleRequest} from "../models/RoleRequest";
import {RolerequestService} from "../services/rolerequest.service";

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})


export class AdminpageComponent implements OnInit {
  public requests: RoleRequest[] = [];

  constructor(private rolerequestService: RolerequestService,
              private notificationService: NotificationService,
              private tokenStorage: TokenStorageService
) {
  }

  roleRequest: RoleRequest = {
    roleRequestId: 123,
    user: this.tokenStorage.getUser(),
    requestDatetime: new Date()
  };
  ngOnInit(): void {
    this.rolerequestService.getAllRequests().subscribe(
      (requests: RoleRequest[]) => {
        this.requests = requests;
      },
      error => {
        this.notificationService.showSnackBar(error.message);
      }
    );
  };

  approve(request: RoleRequest) {
    console.log(request);
    this.rolerequestService.approve(request).subscribe(
      message => {
        this.notificationService.showSnackBar(message);
        window.location.reload();
      },
      error => {
        this.notificationService.showSnackBar(error);
        window.location.reload();
      }
    );
  }

  decline(request: RoleRequest) {
    this.rolerequestService.decline(request).subscribe(
      message => {
        this.notificationService.showSnackBar(message);
        window.location.reload();
      },
      error => {
        this.notificationService.showSnackBar(error);
        window.location.reload();
      }
    );
  }

}
