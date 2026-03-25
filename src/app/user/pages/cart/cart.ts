import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

 loadCart() {
  this.cartService.getCart().subscribe((res: any) => {

    if (!res || !res.items) {
      this.cartItems = [];
      this.total = 0;
      return;
    }

    this.cartItems = res.items;
    this.calculateTotal();

  });
}

  removeItem(id: string) {
    this.cartService.removeItem(id).subscribe(() => {
      this.loadCart();
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
}