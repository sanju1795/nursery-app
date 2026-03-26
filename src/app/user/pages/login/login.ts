import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  isSignup = false;

  // 🔥 form data
  name = '';
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  toggleForm() {
    this.isSignup = !this.isSignup;
  }

  // ✅ SIGNUP
  signup() {
    this.http.post('http://localhost:3000/api/auth/register', {
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe((res: any) => {
      alert('Signup successful 🎉');
      this.isSignup = false;
    }, err => {
      alert('Signup failed ❌');
    });
  }

  // ✅ LOGIN
  login() {
    this.http.post('http://localhost:3000/api/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe((res: any) => {

      // 🔥 save user
      localStorage.setItem('user', JSON.stringify(res.user));

      alert('Login successful ✅');

      this.router.navigate(['/']);

    }, err => {
      alert('Invalid credentials ❌');
    });
  }

}