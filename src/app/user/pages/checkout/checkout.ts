import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent {

constructor(
  public cartService: CartService,
  private router: Router
){}

  placeOrder(){

  alert("Order Placed Successfully");
  this.cartService.clearCart();
  this.router.navigate(['/order-success']);

}

}