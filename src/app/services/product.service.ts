import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.baseUrl);
  }

 addProduct(data:any){
  return this.http.post('http://localhost:3000/api/products/add', data);
}

  deleteProduct(id:any) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  updateProduct(id:any, data:any){
  return this.http.put(this.baseUrl + '/' + id, data);
}

getLowStock(){
  return this.http.get('http://localhost:3000/api/low-stock');
}

getProductById(id: string) {
  return this.http.get<any>(`${this.baseUrl}/${id}`);
}

getPlants() {
  return this.http.get('http://localhost:3000/api/products/plants');
}

getProductsByType(type: string) {
  return this.http.get(`http://localhost:3000/api/products/type/${type}`);
}
}
