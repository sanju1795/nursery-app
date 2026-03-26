import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  getDashboardData() {
    return this.http.get('http://localhost:3000/dashboard');
  }

  getLowStock(){
  return this.http.get('http://localhost:3000/api/low-stock');
}
}