import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) {}

  getOrders(){
    return this.http.get(this.baseUrl);
  }

  updateOrder(id:any, data:any){
    return this.http.put(this.baseUrl + '/' + id, data);
  }
}