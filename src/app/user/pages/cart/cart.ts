import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService,  private cdRef: ChangeDetectorRef ,private router: Router 
) {}

  ngOnInit() {
      if (!localStorage.getItem('user')) {
    alert("Login required 🔐");
    this.router.navigate(['/login']);
    return;
  }
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe((res: any) => {
      this.cartItems = res.items || [];
      this.calculateTotal();
      this.cdRef.detectChanges();
    });
  }

  // ➕ Increase quantity
  increaseQty(item: any) {
    item.quantity++;
    this.calculateTotal();
  }

  // ➖ Decrease quantity
  decreaseQty(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotal();
    }
  }

  // ❌ Remove item
  removeItem(item: any) {
    this.cartService.removeItem(item.productId).subscribe(() => {
      this.loadCart();
    });
  }

  // 💰 Total
  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((sum, item) =>
      sum + item.price * item.quantity, 0);
  }

}