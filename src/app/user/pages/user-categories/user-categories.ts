import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-categories.html',
  styleUrl: './user-categories.css'
})
export class UserCategoriesComponent implements OnInit {

  // 🔥 ADD THIS
  searchText: string = '';

  selectedCategory = '';
  sortOption = '';

  categories: string[] = [];
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute   // ✅ FIX 1
  ) {}

  ngOnInit(): void {
    this.getProducts();

    // ✅ FIX 2
    this.route.queryParams.subscribe((params: any) => {
      this.searchText = params['search'] || '';
      this.selectedCategory = params['category'] || '';
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe((res: any) => {

      this.products = Array.isArray(res) ? res : res.data;

      // categories dynamic
      this.categories = ['All', ...new Set(this.products.map(p => p.category))];

    });
  }

  // 🔥 FINAL FILTER LOGIC
  get filteredProducts() {

    let filtered = this.products;

    // ✅ CATEGORY FILTER
    if (this.selectedCategory && this.selectedCategory !== 'All') {
      filtered = filtered.filter(p =>
        p.category?.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }

    // ✅ SEARCH FILTER
    if (this.searchText) {
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    // ✅ SORT
    if (this.sortOption === 'low') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    }

    if (this.sortOption === 'high') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }

}