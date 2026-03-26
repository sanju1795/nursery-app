import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent implements OnInit {

  cartItems: any[] = [];
  total = 0;
  addresses: any[] = [];

    address: any = {
    name: '',
    phone: '',
    city: '',
    fullAddress: ''
  };

  constructor(
    private cartService: CartService,
    private router: Router,
    private cdRef: ChangeDetectorRef

  ) {}

  ngOnInit() {

     if (!localStorage.getItem('user')) {
    alert("Please login first 🔐");
    this.router.navigate(['/login']);
    return;
  }

    // ✅ 1. Buy Now check karo
    const buyNow = localStorage.getItem('buyNow');

    if (buyNow) {
      const product = JSON.parse(buyNow);
      this.cartItems = [product];

      this.calculateTotal();

      localStorage.removeItem('buyNow');
    }

    // ✅ 2. Normal Cart load karo
    else {
      this.cartService.getCart().subscribe((res: any) => {
        this.cartItems = res.items || [];
        this.calculateTotal();
        this.cdRef.detectChanges(); // 🔥 IMPORTANT

      });
    }

    const saved = localStorage.getItem('addresses');
if (saved) {
  this.addresses = JSON.parse(saved);
}
  }

  calculateTotal() {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

 placeOrder() {

  if (!this.address.name || !this.address.phone || !this.address.fullAddress) {
    alert("Fill all address fields ❗");
    return;
  }

  if (!this.isValidPincode(this.address.pincode)) {
    alert("Invalid Pincode ❌");
    return;
  }

  alert("Order placed successfully 🎉");

  this.cartItems = [];
  this.total = 0;

  this.router.navigate(['/order-success']);
}

getLocation() {

  if (!navigator.geolocation) {
    alert("Geolocation not supported ❌");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      console.log("Lat:", lat, "Lng:", lng);

      // 👉 simple fill (you can improve later)
      this.address.fullAddress = `Lat: ${lat}, Lng: ${lng}`;

    },
    (error) => {
      alert("Location access denied ❌");
    }
  );
}

saveAddress() {

  if (!this.address.name || !this.address.phone || !this.address.fullAddress) {
    alert("Fill all fields ❗");
    return;
  }

  this.addresses.push({ ...this.address });

  // localStorage ma save
  localStorage.setItem('addresses', JSON.stringify(this.addresses));

  alert("Address saved ✅");

  // reset form
  this.address = {
    name: '',
    phone: '',
    city: '',
    fullAddress: ''
  };
}

selectedAddress: any = null;

selectAddress(addr: any) {
  this.selectedAddress = addr;
  this.address = { ...addr }; // auto fill form
}

isValidPincode(pin: string) {
  return /^[0-9]{6}$/.test(pin);
}
}