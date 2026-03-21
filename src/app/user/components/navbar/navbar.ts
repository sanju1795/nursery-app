import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {

  searchText = '';

  constructor(public cartService: CartService, public router: Router) {}

  searchPlant(){
    if(this.searchText.trim()){
      this.router.navigate(['/plants'], {
        queryParams: { search: this.searchText }
      });
    }
  }

}