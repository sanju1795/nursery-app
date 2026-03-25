import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {

  searchText = '';
  cartCount = 0;

  constructor(public cartService: CartService, public router: Router) {}
 
  ngOnInit() {

 this.cartService.loadCartCount(); // 🔥 ADD THIS

  this.cartService.cartCount$.subscribe(count => {
    this.cartCount = count;

  });
}

 searchPlant() {

  console.log("Search value:", this.searchText);

  if (!this.searchText?.trim()) return;

  this.router.navigate(['/user-categories'], {
    queryParams: { search: this.searchText.trim() }
  });

}

}