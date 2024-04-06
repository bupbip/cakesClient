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
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { StatisticComponent } from './layout/statistic/statistic.component';
import {DatePipe, NgOptimizedImage} from "@angular/common";
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './user/profile/profile.component';
import { EditComponent } from './user/edit/edit.component';
import { EditProductComponent } from './user/edit-product/edit-product.component';
import { ConfectionerComponent } from './confectioner/confectioner.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { DeleteProductComponent } from './user/delete-product/delete-product.component';
import { OrderComponent } from './order/order/order.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {EnterTheViewportNotifierDirective} from "./services/enter-the-viewport-notifier.directive";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    StatisticComponent,
    ProductComponent,
    ProfileComponent,
    EditComponent,
    EditProductComponent,
    ConfectionerComponent,
    CreateOrderComponent,
    DeleteProductComponent,
    OrderComponent,
    AdminpageComponent,
    EnterTheViewportNotifierDirective
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
        NgOptimizedImage,
      MatPaginatorModule
    ],
  providers: [
    authInterceptorProviders,
    authErrorInterceptorProvider,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule{

}
