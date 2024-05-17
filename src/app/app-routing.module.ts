import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {IndexComponent} from "./layout/index/index.component";
import {AuthGuardService} from "./helper/auth-guard.service";
import {ProductComponent} from "./product/product.component";
import {ProfileComponent} from "./user/profile/profile.component";
import {EditComponent} from "./user/edit/edit.component";
import {ConfectionerComponent} from "./confectioner/confectioner.component";
import {OrderComponent} from "./order/order/order.component";
import {AdminpageComponent} from "./adminpage/adminpage.component";
import {AdminGuardService} from "./helper/admin-guard.service";
import {StatisticComponent} from "./statistic/statistic.component";
import {ConfectionerGuardService} from "./helper/confectioner-guard.service";

/**
 * Что показывать когда пользователь заходит на URL
 */

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegisterComponent},
  {path: 'production', component: ProductComponent},
  {path: 'confectioners', component: ConfectionerComponent},
  {path: 'profile/:username', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'profile', redirectTo: '/profile/', pathMatch: 'full'},
  {path: 'edit', component: EditComponent, canActivate: [AuthGuardService]},
  {path: 'orders', component: OrderComponent, canActivate: [AuthGuardService]},
  {path: 'admin', component: AdminpageComponent, canActivate: [AdminGuardService]},
  {path: 'statistic', component: StatisticComponent, canActivate: [ConfectionerGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
