import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpSuccess: boolean = false;
  radio = false;
  hide = true;
  email = new FormControl('', [Validators.email]);
  name = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
  }


  ngOnInit() {

  }

  radioButton() {
    this.radio = !this.radio;
  }


  signUp() {
    if (this.email.valid && this.password.valid && this.name.valid && this.radio) {
      let user_str = localStorage.getItem('userinfo');
      if (user_str !== null) {
        alert('User already registered!');
      } else {
        let user_obj = {
          name: this.name.value,
          password: this.password.value,
          email: this.email.value,
        };
        let user_str_new: string = JSON.stringify(user_obj);
        this.signUpSuccess = true;
        localStorage.setItem('userinfo', user_str_new);
        this.router.navigate(['base']);
        alert('New user added!');
      }
    }
  }
}
