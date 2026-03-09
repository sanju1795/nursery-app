import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html'
})
export class OrdersComponent {

  orders = [
    { id:101, customer:'Rahul', product:'Money Plant', amount:250, status:'Pending' },
    { id:102, customer:'Priya', product:'Rose Plant', amount:180, status:'Shipped' },
    { id:103, customer:'Amit', product:'Aloe Vera', amount:120, status:'Delivered' }
  ];

  markDelivered(order:any){
    order.status = 'Delivered';
  }
}