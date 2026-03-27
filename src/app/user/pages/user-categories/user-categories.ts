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
  selectedcategory: string = '';   // 🔥 FIX
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
      this.selectedcategory = params['type'] || '';
      this.loadProducts();
    });
  }

  loadProducts() {
  this.productService.getProducts().subscribe((res: any) => {

    this.products = res;

    // 🔥 categories from category.name
    this.categories = [
      ...new Set(this.products.map(p => p.category?.name))
    ];

    this.cdRef.detectChanges();
  });
}

 get filteredProducts() {

  let filtered = [...this.products];

  // ✅ CATEGORY FILTER
  if (this.selectedcategory && this.selectedcategory !== 'All') {
    filtered = filtered.filter(p =>
      p.category?.name === this.selectedcategory
    );
  }

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