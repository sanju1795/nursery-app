import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';

interface Plant {
  name: string;
  price: number;
  image: string;
}

interface Slide {
  image: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  searchText: string = '';

  // 🌿 Plants Data
  plants: Plant[] = [
    {
      name: 'Snake Plant',
      price: 250,
      image: 'assets/images/snake plant.jpg'
    },
    {
      name: 'Aloe Vera',
      price: 180,
      image: 'assets/images/alovera.jpg'
    },
    {
      name: 'Money Plant',
      price: 200,
      image: 'assets/images/money-plant.png'
    },
    {
      name: 'Peace Lily',
      price: 320,
      image: 'assets/images/peace lilly.jpg'
    }
  ];

  // 🌿 Slider Data
  slides: Slide[] = [
    {
      image: 'assets/images/slider1.png',
      title: '20% OFF Indoor Plants',
      subtitle: 'Decorate your home with beautiful greenery'
    },
    {
      image: 'assets/images/slider2.png',
      title: 'New Arrival Plants',
      subtitle: 'Fresh nursery plants now available'
    },
    {
      image: 'assets/images/slider3.png',
      title: 'Succulent Sale',
      subtitle: 'Get up to 30% discount'
    }
  ];

  currentSlide = 0;

  constructor(private router: Router , public cartService: CartService) {}

  // 🌿 Auto Slider
  ngOnInit(): void {
    setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  // 🌿 Search Function
  searchPlant() {
    if (this.searchText.trim()) {
      this.router.navigate(['/plants'], {
        queryParams: { search: this.searchText }
      });
    }
  }

  // 🌿 Add to Cart Function
  addToCart(plant: any) {
  this.cartService.addToCart(plant);
  alert(plant.name + ' added to cart');
}

}