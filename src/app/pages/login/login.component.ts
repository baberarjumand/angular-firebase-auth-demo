import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  loginFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      userEmail: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(this.validateEmailRegex),
        ]),
      ],
      userPassword: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  onSubmitLogin(): void {
    if (this.loginFormGroup.valid) {
      console.log('Login Form Values Valid!', this.loginFormGroup.value);
      // console.log(this.loginFormGroup.value);
    } else {
      console.log('Login Form Values Invalid!', this.loginFormGroup.value);
      // console.log(this.loginFormGroup.value);
    }
  }

  onGoogleLogin(): void {
    console.log('Google Login Clicked');
  }

  onFacebookLogin(): void {
    console.log('Facebook Login Clicked');
  }
}
