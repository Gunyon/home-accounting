import { Component, OnInit } from '@angular/core';
import { User } from '../../../../common/models/user.model';
import { AuthService } from '../../../../common/services/auth.service';

@Component({
  selector: 'ha-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  onLogout() {
    this.authService.logout();
  }

}
