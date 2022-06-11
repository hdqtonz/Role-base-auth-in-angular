import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user!: User;
  userFromApi!: any;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.user = this.authService.userValue;
    // console.log(this.user);
  }

  ngOnInit(): void {
    this.userService.getById(this.user._id).subscribe((user) => {
      this.userFromApi = user;
    });
  }
}
