import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from './component/UI/sign-up/sign-up.component';
import {SignInComponent} from './component/UI/sign-in/sign-in.component';
import {BaseComponent} from './component/base/base.component';

const routes: Routes = [
  {path: '', component: BaseComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},


  {path: '**', redirectTo: '', component: BaseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
