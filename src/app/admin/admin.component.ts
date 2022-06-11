import { JSDocComment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  loading = false;
  users: User[] = [];

  p = 1;
  limit: any = 5;
  total: number = 0;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.getUser();
  }

  getUser() {
    this.userService
      .getAll(this.p, this.limit)
      .pipe(first())
      .subscribe((data) => {
        this.loading = false;
        this.users = data.resuals;
        this.total = data.total;
      });
  }
  deleteUser(id: string) {
    const data: any = localStorage.getItem('user');
    const newData = JSON.parse(data);
    console.log(newData._id);
    if (newData._id === id) {
      this.authService.logout();
    }
    return this.userService.deleteUserById(id).subscribe((res) => {
      this.users = this.users.filter((item) => item._id !== id);

      alert('User Delete Succesfuly');
    });
  }

  pageChangeEvent(event: number) {
    this.p = event;
    this.getUser();
  }
}
