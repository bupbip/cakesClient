import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EditProductComponent} from "../edit-product/edit-product.component";
import {Product} from "../models/Product";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  aboutMeText: String = "Привет, меня зовут Андрей и я уже 3 года пеку торты и пряники.\nСоветую заказывать именно у меня, вкусно, быстро и круто!";
  instagramLink: String = "www.link.com";
  vkLink: String = "www.link.com";
  pinterestLink: String = "www.link.com";
  telegramLink: String = "www.link.com";
  whatsappLink: String = "www.link.com";
  youtubeLink: String = "www.link.com";
  emailLink: String = "www.link.com";
  selectedImage: string | ArrayBuffer | null = null;

  constructor(private dialog: MatDialog) {}

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

  openEditModal(): void {
    const product: null = null;
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '1000px',
      height: '1000px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
