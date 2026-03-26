import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule, RouterModule,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {

  searchText = '';
  cartCount = 0;
  user: any = null;
 
ngOnInit() {
  this.cartService.loadCartCount();   // 👈 ensure latest

  this.cartService.cartCount$.subscribe(count => {
    this.cartCount = count;
    console.log("cart added");
    this.cdRef.detectChanges();
  });
}

  constructor(public cartService: CartService, public router: Router,   private cdRef: ChangeDetectorRef   // 👈 add this
) {
   // 🔥 ROUTE CHANGE LISTENER
  this.router.events.subscribe(() => {
    const data = localStorage.getItem('user');
    this.user = data ? JSON.parse(data) : null;

    this.cdRef.detectChanges();   // 👈 force update
  });
}

goToProfile() {
  this.router.navigate(['/profile']);
}

 searchPlant() {

  console.log("Search value:", this.searchText);

  if (!this.searchText?.trim()) return;

  this.router.navigate(['/user-categories'], {
    queryParams: { search: this.searchText.trim() }
  });

}

}