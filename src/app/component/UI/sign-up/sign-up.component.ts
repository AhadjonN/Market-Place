import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

// http://localhost:3000/signupUsersList

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public SignUpFrom !: FormGroup;

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
      const userData = {
        name: this.name.value,
        password: this.password.value,
        email: this.email.value,
      };
    }
    // this.http.post<any>('http://localhost:3000/signupUsersList', this.SignUpFrom.value)
    //   .subscribe(res => {
    //     alert('SIGNIN SUCCESFUL');
    //     this.SignUpFrom.reset();
    //     this.router.navigate(['login']).then(r => {
    //     });
    //   }, err => {
    //     alert('Something went wrong');
    //   });
  }
}
