import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from './component/UI/sign-up/sign-up.component';
import {SignInComponent} from './component/UI/sign-in/sign-in.component';
import {BaseComponent} from './component/base/base.component';
import {BasketComponent} from './component/basket/basket.component';
import {InformationComponent} from './component/information/information.component';
import {ProductResolver} from '../service/product.resolver';

const routes: Routes = [
  {path: '', component: BaseComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'information/:id', component: InformationComponent, resolve: {data: ProductResolver}},

  {path: '**', redirectTo: '', component: BaseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
