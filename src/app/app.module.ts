import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {SignInComponent} from './component/UI/sign-in/sign-in.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SignUpComponent} from './component/UI/sign-up/sign-up.component';
import {HeaderComponent} from './component/UI/header/header.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FooterComponent} from './component/UI/footer/footer.component';
import {BaseComponent} from './component/base/base.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {BasketComponent} from './component/basket/basket.component';
import {InformationComponent} from './component/information/information.component';
import {DialogBoxComponent} from './component/dialog-box/dialog-box.component';
import {MatDialogModule} from '@angular/material/dialog';


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
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
