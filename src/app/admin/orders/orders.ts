import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html'
})
export class OrdersComponent implements OnInit {

  orders:any[] = [];

  constructor(
    private service: OrderService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ){}

  ngOnInit(){
    this.loadOrders();
  }

  loadOrders(){
    this.service.getOrders().subscribe({
      next: (res:any)=>{
        console.log("ORDERS:", res);

        this.orders = res || [];

        // 🔥 IMPORTANT FIX
        this.cdr.detectChanges();
      },
      error: (err)=>{
        console.error("ERROR:", err);
      }
    });
  }

 markDelivered(orderId: string) {

  if (!confirm("Mark this order as Delivered?")) return;

  this.http.put(`http://localhost:3000/api/orders/deliver/${orderId}`, {})
    .subscribe({
      next: (res: any) => {

        // 🔥 UI instant update
       this.orders = this.orders.map(order => 
           order._id === orderId
            ? { ...order, status: 'Delivered' } // 🔥 NEW OBJECT
            : order
);
  this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        alert("Update failed ❌");
      }
    });
}

  trackById(index:any, item:any){
  return item._id;
}


}