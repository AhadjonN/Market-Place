import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  radio = false;
  hide = true;
  email = new FormControl('', [Validators.email]);
  name = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  radioButton() {
    this.radio = !this.radio;
  }

  signUp() {
    if (this.email.valid && this.password.valid && this.name.valid && this.radio) {
      const userData = {
        name: this.name.value,
        password: this.password.value,
        email: this.email.value,
      };
    }
  }
}
