import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // ← ngModel support
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-orders.html',
  styleUrls: ['./my-orders.css']
})
export class MyOrdersComponent implements OnInit {

  user: any;
  orders: any[] = [];
  loading = true;


  // Exchange / Return modal
  actionType: 'Exchange' | 'Return' = 'Exchange';
  actionOrderId: string = '';
  actionReason: string = '';
reasons: string[] = [
  'Plant arrived damaged',
  'Wrong plant delivered',
  'Plant not as described',
  'Plant died within a few days',
  'Changed mind / no longer needed',
  'Other'
];
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
          res.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

          this.orders = res.map((order: any) => ({
            ...order,
            items: order.items.map((item: any) => ({
              ...item,
              image: item.image
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

  // Cancel pending order
  cancelOrder(orderId: string) {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    this.http.put(`http://localhost:3000/api/orders/cancel/${orderId}`, {})
      .subscribe({
        next: () => {
          this.orders = this.orders.map(order => {
            if (order._id === orderId) order.status = 'Cancelled';
            return order;
          });
        },
        error: () => alert("Cancel failed ❌")
      });
  }

  // Open modal for Exchange / Return
  openActionModal(orderId: string, type: 'Exchange' | 'Return') {
    this.actionOrderId = orderId;
    this.actionType = type;
    this.actionReason = '';
    const modalEl = document.getElementById('actionModal');
    if (modalEl) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  // Submit Exchange / Return
  submitAction() {
    if (!this.actionReason) {
      alert('Please select a reason!');
      return;
    }

    const endpoint = this.actionType === 'Exchange' 
      ? `http://localhost:3000/api/orders/exchange/${this.actionOrderId}`
      : `http://localhost:3000/api/orders/return/${this.actionOrderId}`;

    this.http.put(endpoint, { reason: this.actionReason })
      .subscribe({
        next: () => {
          alert(`${this.actionType} request submitted ✅`);
          const modalEl = document.getElementById('actionModal');
          if (modalEl) {
            const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
            modal.hide();
          }
        },
        error: () => alert(`${this.actionType} request failed ❌`)
      });
  }

  // In my-orders.ts inside class
getExchangeStatus(order: any) {
  return order.exchangeRequested ? `Exchange ${order.exchangeStatus}` : '';
}

getReturnStatus(order: any) {
  return order.returnRequested ? `Return ${order.returnStatus}` : '';
}

// Disable buttons if already requested
isActionDisabled(order: any, type: 'Exchange' | 'Return') {
  if(type === 'Exchange') return order.exchangeRequested;
  if(type === 'Return') return order.returnRequested;
  return false;
}

loadOrders() {
  this.http.get(`http://localhost:3000/api/orders/${this.user._id}`)
    .subscribe((res: any) => {
      this.orders = res;
    });
}

}