import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';

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
    private cdr: ChangeDetectorRef
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

  markDelivered(order:any){
    const updated = { ...order, status: 'Delivered' };

    this.service.updateOrder(order._id, updated).subscribe(()=>{
      order.status = 'Delivered';

      // 🔥 instant UI update
      this.cdr.detectChanges();
    });
  }

  trackById(index:any, item:any){
  return item._id;
}
}