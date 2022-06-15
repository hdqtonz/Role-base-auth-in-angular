import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject!: any;
  public user!: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    const data: any = localStorage.getItem('user');
    // const data: any = sessionStorage.getItem('user');
    this.userSubject = new BehaviorSubject(JSON.parse(data));
    this.user = this.userSubject.asObservable();
  }
  timeout: any;

  public get userValue(): User {
    return this.userSubject.value;
  }

  tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    this.timeout = expiry - Math.floor(new Date().getTime() / 1000);
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          this.tokenExpired(user.token);
          localStorage.setItem('user', JSON.stringify(user));
          // sessionStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          this.autoLogout();
          return user;
        })
      );
  }

  autoLogout() {
    setTimeout(() => {
      this.logout();
    }, this.timeout * 1000);
  }

  logout() {
    localStorage.removeItem('user');
    // sessionStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
