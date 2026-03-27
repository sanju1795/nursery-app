import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  loading = true;

  constructor(
    private http: HttpClient,
    public router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {

    const data = localStorage.getItem('user');
    this.user = data ? JSON.parse(data) : null;

    if (!this.user?._id) {
      this.loading = false;
      return;
    }

    this.http.get(`http://localhost:3000/api/orders/${this.user._id}`)
      .subscribe({
        next: (res: any) => {
          console.log("Orders:", res);

            res.sort((a: any, b: any) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });


          this.orders = res.map((order: any) => ({
  ...order,
  items: order.items.map((item: any) => ({
    ...item,
    image: item.image
      ? 'http://localhost:4200/' + item.image
      : 'https://via.placeholder.com/80'
  }))
}));

          this.loading = false;
          this.cdRef.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }

  cancelOrder(orderId: string) {

  if (!confirm("Are you sure you want to cancel this order?")) return;

  this.http.put(`http://localhost:3000/api/orders/cancel/${orderId}`, {})
    .subscribe({
      next: (res: any) => {

        // 🔥 UI update instantly
        this.orders = this.orders.map(order => {
          if (order._id === orderId) {
            order.status = 'Cancelled';
          }
          return order;
        });

      },
      error: (err) => {
        console.error(err);
        alert("Cancel failed ❌");
      }
    });
}

  logout() {
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/login']);
  }
}