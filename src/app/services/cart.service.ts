import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = 'http://localhost:3000/api/cart';
  userId = 'user1';

  // 🔥 LIVE COUNT
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor(private http: HttpClient) {
    this.loadCartCount(); // initial load
  }

  // ✅ LOAD COUNT FROM DB
  loadCartCount() {
    this.getCart().subscribe((res: any) => {
      const count = res.items?.length || 0;
      this.cartCount.next(count);
    });
  }

  // ✅ GET CART
  getCart() {
    return this.http.get(`${this.baseUrl}/${this.userId}`);
  }

  // ✅ ADD TO CART
  addToCart(product: any) {
    return this.http.post(`${this.baseUrl}/add`, {
      userId: this.userId,
      product: product
    }).pipe(tap(() => this.loadCartCount())); // 🔥 auto update
  }

  // ✅ REMOVE
  removeItem(productId: string) {
    return this.http.delete(
      `${this.baseUrl}/remove/${this.userId}/${productId}`
    ).pipe(tap(() => this.loadCartCount())); // 🔥 auto update
  }

  clearCart() {
  return this.http.delete(`${this.baseUrl}/clear/${this.userId}`)
    .pipe(tap(() => this.loadCartCount()));
}
}