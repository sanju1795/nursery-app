import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-categories.html',
  styleUrl: './user-categories.css'
})
export class UserCategoriesComponent implements OnInit {

  searchText: string = '';
  selectedType: string = '';   // 🔥 FIX
  sortOption = '';

  categories: string[] = [];
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: any) => {
      this.searchText = params['search'] || '';
      this.selectedType = params['type'] || '';
      this.loadProducts();
    });
  }

  loadProducts() {

    if (this.selectedType) {
      this.productService.getProductsByType(this.selectedType)
        .subscribe((res: any) => {
          this.products = res;
          this.cdRef.detectChanges();
        });

    } else {
      this.productService.getProducts()
        .subscribe((res: any) => {
          this.products = res;

          // dynamic categories
          this.categories = ['All', ...new Set(this.products.map(p => p.type))];

          this.cdRef.detectChanges();
        });
    }
  }

  get filteredProducts() {

    let filtered = [...this.products];  // 🔥 FIX (copy)

    // SEARCH
    if (this.searchText) {
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    // SORT
    if (this.sortOption === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (this.sortOption === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }

}