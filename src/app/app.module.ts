import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material-module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {authInterceptorProviders} from "./helper/auth-interceptor.service";
import {authErrorInterceptorProvider} from "./helper/error-interceptor.service";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import {MatTooltipModule} from "@angular/material/tooltip";
import { IndexComponent } from './layout/index/index.component';
import { AddOrderComponent } from './user/add-order/add-order.component';
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { StatisticComponent } from './layout/statistic/statistic.component';
import {NgOptimizedImage} from "@angular/common";
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ConfectionerComponent } from './confectioner/confectioner.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    AddOrderComponent,
    StatisticComponent,
    ProductComponent,
    ProfileComponent,
    EditComponent,
    EditProductComponent,
    ConfectionerComponent,
    OrderComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatTooltipModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        NgOptimizedImage
    ],
  providers: [
    authInterceptorProviders,
    authErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule{

}
