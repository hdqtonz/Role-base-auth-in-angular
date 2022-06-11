import { Component, OnInit } from '@angular/core';
import { Role } from './models/role';
import { User } from './models/user';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  user!: User;
  signUpBtn!: Boolean;

  constructor(private authService: AuthService) {
    this.authService.user.subscribe((data) => (this.user = data));
  }
  ngOnInit(): void {
    const data = localStorage.getItem('user');
    if (data == null) {
      this.signUpBtn = false;
    } else {
      this.signUpBtn = true;
    }
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  logout() {
    this.authService.logout();
  }
}
