import { firebase } from 'firebaseui-angular';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  authStateSub: Subscription;

  constructor(public authService: UserAuthService) {}

  ngOnInit(): void {
    this.authStateSub = this.authService.authState().subscribe((user) => {
      console.log(user);
    });
  }
}
