import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../model/user.model';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  currentUser$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.currentUser$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  // Sets user data in db on login
  private updateUserDataInDb(user): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(data, { merge: true });
  }

  private async signInWithProvider(provider): Promise<void> {
    // sign in with a popup
    return this.afAuth
      .signInWithPopup(provider)
      .then((credential: any) => {
        this.ngZone.run(() => this.router.navigate(['home']));
        return this.updateUserDataInDb(credential.user);
      })
      .catch((error) => {
        console.log(error);
        window.alert(error);
      });

    // sign in with a redirect
    // this.afAuth.signInWithRedirect(provider);
  }

  async googleSignIn(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    await this.signInWithProvider(provider);
  }

  async facebookSignIn(): Promise<void> {
    const provider = new auth.FacebookAuthProvider();
    await this.signInWithProvider(provider);
  }

  async createNewUserWithEmailPassword(
    email: string,
    password: string
  ): Promise<void> {
    await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((credential: any) => {
        this.ngZone.run(() => this.router.navigate(['home']));
        return this.updateUserDataInDb(credential.user);
      })
      .catch((error) => {
        console.log(error);
        window.alert(error);
      });
  }

  async signInUserWithEmailPassword(
    email: string,
    password: string
  ): Promise<void> {
    await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((credential: any) => {
        this.ngZone.run(() => this.router.navigate(['home']));
        return this.updateUserDataInDb(credential.user);
      })
      .catch((error) => {
        console.log(error);
        window.alert(error);
      });
  }

  async signOut(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
}
