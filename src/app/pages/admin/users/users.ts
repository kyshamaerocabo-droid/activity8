import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // ✅ ADDED

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
  imports: [CommonModule, ReactiveFormsModule, FormsModule], // ✅ ADDED FormsModule
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class Users {

  private fb = inject(FormBuilder);

  message: string = '';
  users: User[] = [];
  submitted: boolean = false;

  // ✅ ADDED
  selectedIndex: number = -1;
  searchText: string = '';

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    contact: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]],
    address: ['', Validators.required],
    role: ['Student', Validators.required]
  });

  register() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.message = 'Please fill in all required fields.';
      return;
    }

    const newUser: User = this.loginForm.value as User;
    this.users.push(newUser);
    this.message = 'Registration successful';
    this.loginForm.reset({ role: 'Student' });
    this.submitted = false;
  }

  // ✅ DELETE
  deleteUser(index: number) {
    this.users.splice(index, 1);
  }

  // ✅ EDIT
  editUser(index: number) {
    const user = this.users[index];
    this.loginForm.patchValue(user);
    this.selectedIndex = index;
  }

  // ✅ UPDATE
  updateUser() {
    if (this.loginForm.invalid || this.selectedIndex === -1) return;

    this.users[this.selectedIndex] = this.loginForm.value as User;
    this.message = 'User updated successfully';
    this.loginForm.reset({ role: 'Student' });
    this.selectedIndex = -1;
  }

  // ✅ SEARCH
  get filteredUsers() {
    return this.users.filter(u =>
      u.username.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}