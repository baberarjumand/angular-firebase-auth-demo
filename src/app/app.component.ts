import { UserAuthService } from './shared/services/user-auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-firebase-auth-demo';

  constructor(private authService: UserAuthService, private router: Router) {}

  ngOnInit(): void {
    // this.authService.currentUser$.subscribe((user) => {
    //   if (user) {
    //     this.router.navigate(['']);
    //   }
    // });
  }
}
