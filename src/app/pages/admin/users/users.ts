import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {

  username: string = '';
  email: string = '';
  password: string = '';
  contact: string = '';
  address: string = '';
  role: string = 'Student';

  message: string = '';

  users: User[] = [];

  register() {

    const newUser: User = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
      contact: this.contact,
      address: this.address
    };

    this.users.push(newUser);

    this.message = "Registration successful";

    this.username = '';
    this.email = '';
    this.password = '';
    this.contact = '';
    this.address = '';
    this.role = 'Student';
  }

}