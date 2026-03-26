import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  plants: any[] = [];

  slides = [
    {
      image: 'assets/images/slider1.png',
      title: 'Beautiful Plants',
      subtitle: 'Make your home green'
    },
    {
      image: 'assets/images/slider2.png',
      title: 'Fresh Air',
      subtitle: 'Live healthy with plants'
    },
    {
      image: 'assets/images/slider3.png',
      title: 'Nature Love',
      subtitle: 'Bring nature indoors'
    }
  ];

  currentSlide: number = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getPlants();
    this.cartService.loadCartCount();
    }

  // 🔥 SIMPLE FETCH (NO FILTER FOR NOW)
 getPlants() {
  this.productService.getProducts().subscribe((res: any) => {

    console.log("API Response:", res);

    if (Array.isArray(res)) {
      this.plants = res;
    } else if (res.data) {
      this.plants = res.data;
    } else {
      this.plants = [];
    }

    console.log("Final Plants:", this.plants);

    this.cdRef.detectChanges();   // 👈 VERY IMPORTANT

  }, (err) => {
    console.error("Error:", err);
  });
}

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

 addToCart(product: any) {
  this.cartService.addToCart(product).subscribe(() => {
    alert("Added to cart");
  });
}
}