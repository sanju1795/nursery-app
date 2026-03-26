import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-plants',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './plants.html',
  styleUrls: ['./plants.css']
})
export class PlantsComponent implements OnInit {

  plants: any[] = [];

  constructor(private productService: ProductService, private cdRef: ChangeDetectorRef) {}

 ngOnInit() {
    this.loadPlants();
      console.log("Plants component loaded");  // 👈 check this

}

loadPlants() {
  this.productService.getPlants().subscribe((res: any) => {
    this.plants = res;
    console.log("Plants loaded:", this.plants);
    this.cdRef.detectChanges();
  });
}

}