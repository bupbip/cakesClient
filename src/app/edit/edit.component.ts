import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EditProductComponent} from "../edit-product/edit-product.component";
import {Product} from "../models/Product";
import {ProductService} from "../services/product.service";
import {DomSanitizer} from "@angular/platform-browser";
import {NotificationService} from "../services/notification.service";
import {Router} from "@angular/router";
import {Social} from "../models/Social";
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  products: Product[] = [];
  username: string = "";
  public user: User | undefined;

  aboutMeText: String = "Привет, меня зовут Андрей и я уже 3 года пеку торты и пряники.\nСоветую заказывать именно у меня, вкусно, быстро и круто!";
  socialLinks: Social[] = [
    {type: 'INSTAGRAM', url: ''},
    {type: 'VK', url: ''},
    {type: 'PINTEREST', url: ''},
    {type: 'TELEGRAM', url: ''},
    {type: 'WHATSAPP', url: ''},
    {type: 'YOUTUBE', url: ''},
    {type: 'EMAIL', url: ''}
  ];
  selectedImage: string | ArrayBuffer | null = null;

  constructor(private dialog: MatDialog,
              private productService: ProductService,
              private userService: UserService,
              private tokenStorageService: TokenStorageService,
              private sanitizer: DomSanitizer,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit() {
    this.username = this.tokenStorageService.getUser().username;

    this.userService.getUserByUsername(this.username).subscribe(
      (user: User) => {
        this.user = user;
        console.log(user);
        if (this.user) {
          this.socialLinks.forEach(link => {
            const userSocial = this.user?.socialNetworks.find(social => social.type.toUpperCase() === link.type);
            if (userSocial) {
              link.url = userSocial.url;
            }
          });
        }
        this.selectedImage = this.user?.image;
      },
      error => {
        // this.notificationService.showSnackBar(error.message);
      }
    );

    this.productService.getAllUserProducts(this.username).subscribe(
      (products: Product[]) => {
        this.products = products.map(product => ({
          ...product,
          // image: this.sanitizer.bypassSecurityTrustUrl('product.image)

        }));
        console.log(products);
      },
      error => {
        // this.notificationService.showSnackBar(error.message);
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.selectedImage = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  openEditModal(product: Product): void {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '1000px',
      height: '1000px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) return;
      this.productService.saveProduct(result).subscribe(
        response => {
          this.refreshProduct(response);
        },
        error => {
          console.log("error");
        });
    })
  };

  refreshProduct(product: Product): void {
    const index = this.products.findIndex(p => p.productId === product.productId);
    if (index !== -1) {
      this.products[index] = product;
    }
  };

  saveProfile(): void {
    console.log(this.user?.socialNetworks);
    this.socialLinks.forEach(link => {
      const existingNetwork = this.user?.socialNetworks.find(network => network.type === link.type);
      if (!existingNetwork) {
        this.user?.socialNetworks.push({type: link.type, url: link.url});
      } else {
        existingNetwork.url = link.url;
      }
    });
    console.log(this.user);

    if (this.user) {
      this.user.image = this.selectedImage;
    }

    this.userService.saveUser(this.user).subscribe(
      response => {
        this.refreshProduct(response);
        this.notificationService.showSnackBar("Успех!");
      },
      error => {
        console.log(error);
      });


    this.router.navigateByUrl('/profile', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/profile', this.username]);
    });
  };

}
