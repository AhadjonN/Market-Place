import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from './component/UI/sign-up/sign-up.component';
import {SignInComponent} from './component/UI/sign-in/sign-in.component';
import {BaseComponent} from './component/allProducts/base/base.component';
import {BasketComponent} from './component/basket/basket.component';
import {InformationComponent} from './component/information/information.component';
import {ProductResolver} from '../service/product.resolver';
import {FavouritesComponent} from './component/favourites/favourites.component';
import {BaseProductComponent} from "./component/base-product/base-product.component";
import {MouseComponent} from "./component/allProducts/mouse/mouse.component";
import {KeyboardComponent} from "./component/allProducts/keyboard/keyboard.component";


const routes: Routes = [
  {path: '', component: BaseProductComponent},
  {path: 'base', component: BaseComponent},
  {path: 'mouse', component: MouseComponent},
  {path: 'keyboard', component: KeyboardComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'favorite', component: FavouritesComponent},
  {path: 'favorite/information/:id', component: InformationComponent, resolve: {data: ProductResolver}},
  {path: 'base/information/:id', component: InformationComponent, resolve: {data: ProductResolver}},
  {path: 'mouse/information/:id', component: InformationComponent, resolve: {data: ProductResolver}},
  {path: 'keyboard/information/:id', component: InformationComponent, resolve: {data: ProductResolver}},
  {path: '**', redirectTo: '', component: BaseProductComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
