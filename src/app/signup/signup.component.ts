import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  newError: Boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
    });
  }

  submit() {
    this.userService.createNewUser(this.signupForm.value).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/login']);
      },
      (err) => {
        this.newError = true;
        console.log(err);
        // this.router.navigate(['/login']);
      }
    );
  }
}
