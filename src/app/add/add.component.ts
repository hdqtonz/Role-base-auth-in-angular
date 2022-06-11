import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  addform!: FormGroup;
  newError = false;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.addform = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
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
      role: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    const userdata = this.addform.value;
    this.userService.createNewUser(userdata).subscribe(
      (res) => {
        alert('User Add Successfully');
        this.router.navigate(['/admin']);
        this.newError = false;
      },
      (error) => {
        this.newError = true;
        console.log(error);
      }
    );
    this.addform.reset();
  }
}
