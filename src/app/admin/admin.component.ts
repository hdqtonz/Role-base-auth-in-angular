import { JSDocComment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  serchvalue: string = '';
  sform!: FormGroup;

  p = 1;
  limit: any = 5;
  total: any;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.sform = new FormGroup({
      search: new FormControl(''),
    });

    this.getUser();
  }

  // Getting all User
  getUser() {
    this.userService
      .getAll(this.p, this.limit, this.serchvalue)
      .subscribe((data) => {
        this.loading = false;
        this.users = data.resuals;
        this.total = data.total;
      });
  }
  // Delete User
  deleteUser(id: any) {
    const data: any = localStorage.getItem('user');
    // const data: any = sessionStorage.getItem('user');

    const newData = JSON.parse(data);

    if (newData._id === id) {
      this.authService.logout();
    }
    return this.userService.deleteUserById(id).subscribe((res) => {
      this.users = this.users.filter((item) => item._id !== id);

      alert('User Delete Succesfuly');
    });
  }

  // paggination event
  pageChangeEvent(event: number) {
    this.p = event;
    this.getUser();
  }

  // search submit button
  submit() {
    this.p = 1;
    this.serchvalue = this.sform.value.search;
    this.getUser();
  }
}
