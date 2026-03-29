import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetailsComponent implements OnInit {

  product: any;
  relatedProducts: any[] = [];
  quantity = 1;
  selectedImage: string = '';


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private cdRef: ChangeDetectorRef,
    public router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadProduct(id);
    });
  }

  // ✅ check login
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  loadProduct(id: string) {
    this.productService.getProductById(id).subscribe(res => {
      this.product = res;
      this.loadRelatedProducts();
    });
  }

loadRelatedProducts() {
  this.productService.getProducts().subscribe((res: any) => {

    // ✅ STEP 1: filter same category
    const filtered = res.filter((p: any) => {

      const currentCat = this.product.category?._id || this.product.category;
      const pCat = p.category?._id || p.category;

      return currentCat === pCat && p._id !== this.product._id;
    });

    // ✅ STEP 2: random shuffle
    const shuffled = filtered.sort(() => 0.5 - Math.random());

    // ✅ STEP 3: limit to 8
    this.relatedProducts = shuffled.slice(0, 8);

    this.cdRef.detectChanges();
  });
}
  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
  }

  // ✅ ADD TO CART
  addToCart(product: any) {

    if (!this.isLoggedIn()) {
      alert("Please login first 🔐");
      this.router.navigate(['/login']);
      return;
    }

    const productWithQty = {
      ...product,
      quantity: this.quantity
    };

    this.cartService.addToCart(productWithQty).subscribe(() => {
      alert("Added to cart ✅");
    });
  }

  // ✅ BUY NOW
  buyNow() {

    if (!this.isLoggedIn()) {
      alert("Please login first 🔐");
      this.router.navigate(['/login']);
      return;
    }

    const productWithQty = {
      ...this.product,
      quantity: this.quantity
    };

    localStorage.setItem('buyNow', JSON.stringify(productWithQty));
    this.router.navigate(['/checkout']);
  }

  goToProduct(id: string) {
  this.router.navigate(['/product', id]).then(() => {
    window.location.reload(); // 🔥 IMPORTANT FIX
  });
}
}