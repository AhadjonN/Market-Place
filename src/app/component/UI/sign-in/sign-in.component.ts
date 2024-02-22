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
  incorrectMail: boolean = false;
  incorrectPassword: boolean = false;
  hide = true;
  email = new FormControl('', [Validators.email]);
  password = new FormControl('', [Validators.required]);


  routerNavigate() {
    this.router.navigate(['sign-up']);
  }

  Enter(): void {
    let user_str = localStorage.getItem('userinfo');
    if (user_str === null) {
      console.log('Данные пользователя не найдены');
      return;
    }

    let user = JSON.parse(user_str);
    if (this.email.value === user['email']) {
      console.log('Email верифицирован');
    } else {
      this.incorrectMail = true;
      console.log('Email не верифицирован');
      return;
    }
    if (this.password.value === user['password']) {
      console.log('Пароль верифицирован');
    } else {
      this.incorrectPassword = true;
      console.log('Пароль не верифицирован');
      return;
    }
    alert('Вы успешно вошли');
  }
}


