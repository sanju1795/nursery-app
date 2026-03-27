import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) {}

  // ✅ PLACE ORDER
  placeOrder(data: any) {
    return this.http.post(this.baseUrl + '/place', data);
  }

  // ✅ ADMIN - GET ALL ORDERS (🔥 ERROR FIX 1)
  getOrders() {
    return this.http.get(this.baseUrl);
  }

  // ✅ ADMIN - UPDATE ORDER (🔥 ERROR FIX 2)
  updateOrder(id: any, data: any) {
    return this.http.put(this.baseUrl + '/' + id, data);
  }

  // ✅ USER ORDERS
  getUserOrders(userId: string) {
    return this.http.get(this.baseUrl + '/' + userId);
  }
}