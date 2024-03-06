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

  incorrect: boolean = false;
  hide = true;
  email = new FormControl('', [Validators.email]);
  password = new FormControl('', [Validators.required]);

  routerNavigate() {
    this.router.navigate(['sign-up']);
  }

  Enter(): void {
    let user_str = localStorage.getItem('userinfo');
    if (user_str === null) {
      alert('User data not found!');
      return;
    }

    let user = JSON.parse(user_str);
    if (this.email.value === user['email'] && this.password.value === user['password']) {
      this.router.navigate(['base']);
      alert('You are logged in!');
      return;
    } else {
      this.incorrect = true;
    }
  }
}
