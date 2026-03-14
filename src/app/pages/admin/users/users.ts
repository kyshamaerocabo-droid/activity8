import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

interface User {
  username: string;
  email: string;
  password: string;
  role: string;
  contact: string;
  address: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class Users {

  private fb = inject(FormBuilder);

  message: string = '';
  users: User[] = [];
  submitted: boolean = false;  // track if the user clicked register

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    contact: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]],
    address: ['', Validators.required],
    role: ['Student', Validators.required]
  });

  register() {
    this.submitted = true; // mark that register was clicked

    if (this.loginForm.invalid) {
      this.message = 'Please fill in all required fields.';
      return;
    }

    const newUser: User = this.loginForm.value as User;
    this.users.push(newUser);
    this.message = 'Registration successful';
    this.loginForm.reset({ role: 'Student' });
    this.submitted = false; // reset submitted after successful registration
  }
}