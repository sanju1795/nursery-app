import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  orders: any[] = [];

  constructor(private http: HttpClient, public router: Router) {}

  ngOnInit() {

    // ✅ USER LOAD
    const data = localStorage.getItem('user');
    this.user = data ? JSON.parse(data) : null;

    // ✅ USER ORDERS LOAD
    if (this.user?._id) {
      this.http.get(`http://localhost:3000/api/orders/${this.user._id}`)
        .subscribe((res: any) => {
          this.orders = res;
        });
    }
  }

  logout() {
  localStorage.removeItem('user');
  this.user = null;
  this.router.navigate(['/login']);
}
}