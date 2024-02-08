import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {IndexComponent} from "./layout/index/index.component";
import {AuthGuardService} from "./helper/auth-guard.service";
import {AddOrderComponent} from "./user/add-order/add-order.component";
import {ProductComponent} from "./product/product.component";
import {ProfileComponent} from "./profile/profile.component";

/**
 * Что показывать когда пользователь заходит на URL
 */

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: IndexComponent },
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegisterComponent},
  {path: 'production', component: ProductComponent},
  {path: 'profile', component: ProfileComponent}
  // {path: 'main', component: IndexComponent, canActivate: [AuthGuardService], children: [
  //     {path: 'add', component: AddOrderComponent, canActivate: [AuthGuardService]}
  //   ]},
  // {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
