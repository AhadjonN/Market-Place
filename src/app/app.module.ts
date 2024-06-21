import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {SignInComponent} from './component/UI/sign-in/sign-in.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SignUpComponent} from './component/UI/sign-up/sign-up.component';
import {HeaderComponent} from './component/UI/header/header.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FooterComponent} from './component/UI/footer/footer.component';
import {BaseComponent} from './component/allProducts/base/base.component';
import {MatListModule} from '@angular/material/list';
import {BasketComponent} from './component/basket/basket.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {InformationComponent} from './component/information/information.component';
import {DialogBoxComponent} from './component/dialog-box/dialog-box.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {FavouritesComponent} from './component/favourites/favourites.component';
import {ProductsService} from "../service/products.service";
import { BaseProductComponent } from './component/base-product/base-product.component';
import { MouseComponent } from './component/allProducts/mouse/mouse.component';
import {RouterLink} from "@angular/router";
import {MatBadgeModule} from "@angular/material/badge";
import { KeyboardComponent } from './component/allProducts/keyboard/keyboard.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent,
    BaseComponent,
    BasketComponent,
    InformationComponent,
    DialogBoxComponent,
    FavouritesComponent,
    BaseProductComponent,
    MouseComponent,
    KeyboardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatListModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatMenuModule,
    MatSidenavModule,
    RouterLink,
    MatBadgeModule,
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
