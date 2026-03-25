import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
    private cdRef: ChangeDetectorRef
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadProduct(id);
      console.log( "product loaded with ID:", id);
    });
  }

  loadProduct(id: string) {
    this.productService.getProductById(id).subscribe(res => {
      this.product = res;

      this.loadRelatedProducts();
    });
  }

  loadRelatedProducts() {
    this.productService.getProducts().subscribe((res: any) => {
      this.relatedProducts = res.filter((p: any) =>
        p.category === this.product.category && p._id !== this.product._id
      );
      this.cdRef.detectChanges();
    });
  }

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart(product: any) {
  this.cartService.addToCart(product).subscribe(() => {
    console.log("Added to cart");
  });
}

}