import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = 'http://localhost:3000/api/categories';

  constructor(private http: HttpClient) {}

  getCategories(){
    return this.http.get(this.baseUrl);
  }

  addCategory(data:any){
    return this.http.post(this.baseUrl, data);
  }

  deleteCategory(id:any){
    return this.http.delete(this.baseUrl + '/' + id);
  }
  updateCategory(id:any, data:any){
  return this.http.put(this.baseUrl + '/' + id, data);
}
}