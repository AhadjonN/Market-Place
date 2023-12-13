import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})

export class SignInComponent {

  constructor(private router: Router) {
  }

  hide = true;
  email = new FormControl('', [Validators.email]);
  password = new FormControl('', [Validators.required]);

  routerNavigate() {
    this.router.navigate(['sign-up']);
  }
}


