import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  FirebaseUISignInFailure,
  FirebaseUISignInSuccessWithAuthResult,
} from 'firebaseui-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  authState(): Observable<any> {
    return this.afAuth.authState;
  }

  logOut(): void {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  successCallback(data: FirebaseUISignInSuccessWithAuthResult): void {
    console.log('successCallback', data);
    this.router.navigate(['']);
  }

  errorCallback(data: FirebaseUISignInFailure): void {
    console.warn('errorCallback', data);
  }

  uiShownCallback(): void {
    console.log('UI shown');
  }
}
