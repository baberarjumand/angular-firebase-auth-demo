import { UserAuthService } from './../../shared/services/user-auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  validateEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  signUpFormGroup: FormGroup;
  signUpFormSub: Subscription;

  constructor(private fb: FormBuilder, private authService: UserAuthService) {}

  ngOnInit(): void {
    this.signUpFormGroup = this.fb.group({
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
      userConfirmPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          this.matchValues('userPassword'),
        ]),
      ],
    });

    // update validity of userConfirmPassword every time userPassword updated
    this.signUpFormSub = this.signUpFormGroup.controls.userPassword.valueChanges.subscribe(
      () => {
        this.signUpFormGroup.controls.userConfirmPassword.updateValueAndValidity();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.signUpFormSub) {
      this.signUpFormSub.unsubscribe();
    }
  }

  // match password solution found at:
  // https://stackoverflow.com/questions/51605737/confirm-password-validation-in-angular-6
  private matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }

  onSubmitSignUp(): void {
    if (this.signUpFormGroup.valid) {
      // console.log('Sign Up Form Values Valid!', this.signUpFormGroup.value);
      // console.log(this.signUpFormGroup.value);
      const email = this.signUpFormGroup.value.userEmail;
      const password = this.signUpFormGroup.value.userPassword;
      this.authService.createNewUserWithEmailPassword(email, password);
    } else {
      console.log('Sign Up Form Values Invalid!', this.signUpFormGroup.value);
      // console.log(this.signUpFormGroup.value);
    }
  }

  onGoogleSignUp(): void {
    // console.log('Google Sign Up clicked!');
    this.authService.facebookSignIn();
  }

  onFacebookSignUp(): void {
    // console.log('Facebook Sign Up clicked!');
    this.authService.facebookSignIn();
  }
}
