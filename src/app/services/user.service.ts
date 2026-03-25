import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(){
    return this.http.get(this.baseUrl);
  }

  addUser(data:any){
    return this.http.post(this.baseUrl, data);
  }

  deleteUser(id:any){
    return this.http.delete(this.baseUrl + '/' + id);
  }
}