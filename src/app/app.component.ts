import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { Role } from './models/role';
import { User } from './models/user';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title(title: any) {}

  user!: User;

  constructor(private authService: AuthService) {
    this.authService.user.subscribe((data) => (this.user = data));
  }

  ngOnInit(): void {
    const data = localStorage.getItem('user');
    // const data = sessionStorage.getItem('user');
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  get isLogdIn() {
    return this.user ? true : false;
  }

  logout() {
    this.authService.logout();
  }
}
