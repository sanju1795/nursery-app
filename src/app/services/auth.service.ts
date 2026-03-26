import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // ✅ Check user logged in or not
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  // ✅ Get current user
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // ✅ Get user ID (very useful)
  getUserId(): string | null {
    const user = this.getUser();
    return user?._id || null;
  }

  // ✅ Save user after login
  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // ✅ Logout
  logout() {
    localStorage.removeItem('user');
  }

}