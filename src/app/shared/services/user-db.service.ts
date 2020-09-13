import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserDbService {
  constructor(
    private authService: UserAuthService,
    private afs: AngularFirestore
  ) {
    // this.authService.authState().subscribe((user) => {
    //   if (user) {
    //     this.updateUserInDb(user);
    //   }
    // });
  }

  updateUserInDb(userObj): void {
    // console.log(userObj);

    const tempUser: User = {
      uid: userObj.uid,
      email: userObj.email,
      displayName: userObj.displayName,
      photoURL: userObj.photoURL,
      emailVerified: userObj.emailVerified,
    };

    if (userObj.providerData.length > 0) {
      tempUser.authProviders = [];
      for (const provider of userObj.providerData) {
        tempUser.authProviders.push(provider.providerId);
      }
    }

    // console.log(tempUser);

    const userDocRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${userObj.uid}`
    );

    userDocRef.set(tempUser, { merge: true });
  }
}
