import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EditProductComponent} from "../edit-product/edit-product.component";
import {Product} from "../../models/Product";
import {ProductService} from "../../services/product.service";
import {DomSanitizer} from "@angular/platform-browser";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";
import {Social} from "../../models/Social";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {DeleteProductComponent} from "../delete-product/delete-product.component";
import {ProductType} from "../../models/ProductType";
import {Filling} from "../../models/Filling";
import {FillingsService} from "../../services/fillings.service";

export type DeletableItem = Product | Filling | ProductType;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  products: Product[] = [];
  username: string = "";
  public user: User | undefined;

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

  productTypes: ProductType[] = [];
  fillings: Filling[] = [];

  constructor(private dialog: MatDialog,
              private productService: ProductService,
              private userService: UserService,
              private fillingService: FillingsService,
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

        if (this.user.fillings) this.fillings = this.user.fillings.slice();
        if (this.user.productTypes) this.productTypes = this.user.productTypes;
        console.log(this.user);
          this.socialLinks.forEach(link => {
            const userSocial = this.user?.socialNetworks.find(social => social.type.toUpperCase() === link.type);
            if (userSocial) {
              link.url = userSocial.url;
            }
          });
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

  openDeleteModal(item: DeletableItem): void {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      width: 'auto',
      height: 'auto',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === "delete") {
        console.log(item);
        console.log("fillingId" in item);
        console.log("productTypeId" in item);
        if ("fillings" in item) {
          this.productTypes = this.productTypes.filter(productType => productType !== item);
        } else if ("name" in item) {
          this.fillings = this.fillings.filter(filling => filling !== item);
        }
      }
    });
  }

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
        this.notificationService.showSnackBar("Успех!");
      },
      error => {
        console.log(error);
      });


    this.router.navigateByUrl('/profile', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/profile', this.username]);
    });
  };

  addProduct(): void {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '1000px',
      height: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) return;
      result.ownerUsername = this.username;
      console.log(result);
      this.productService.saveProduct(result).subscribe(
        response => {
          this.router.navigateByUrl('/profile', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/profile', this.username]);
          });
        },
        error => {
          console.log("error");
        });
    })
  };

  changeRole() {
    if (this.user) {
      this.user.role = "ROLE_CONFECTIONER";
      this.saveProfile();
    }
  }

  addFilling(): void {
    const newFilling = { name: '', description: '', userId: this.user?.userId};
    this.fillings.push(<Filling> newFilling);
  }

  addProductType(): void {
    const emptyProductType: ProductType = {
      name: '',
      canOrder: false,
      canWeight: false,
      canCount: false,
      fillings: []
    };
    this.productTypes.push(emptyProductType);
  }

  saveFillings(): void {
    this.fillingService.saveFillings(this.fillings).subscribe(
      savedFillings => {
        if (this.user) {
          this.user.fillings = savedFillings;
        }

      },
      error => {
        console.log("error");
      });
  };

  isFillingSelected(productType: ProductType, fillingId: number | undefined): boolean {
    // @ts-ignore
    return productType.fillings.includes(<number>fillingId);
  }

  toggleFillingSelection(productType: ProductType, fillingId: number | undefined): void {
      // @ts-ignore
    const index = productType.fillings.indexOf(<number>fillingId);
      if (index !== -1) {
        // @ts-ignore
        productType.fillings.splice(index, 1);
      } else {
        // @ts-ignore
        productType.fillings.push(<number>fillingId);
      }
  }

}
