import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(this.baseUrl + '/users');
  }

  addUser(data: any) {
    return this.http.post(this.baseUrl + '/users', data);
  }
}