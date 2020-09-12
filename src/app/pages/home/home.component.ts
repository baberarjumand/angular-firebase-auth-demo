import { UserAuthService } from './../../shared/services/user-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public authService: UserAuthService) {}

  ngOnInit(): void {}
}
