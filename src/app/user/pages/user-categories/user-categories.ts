import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-categories.html',
  styleUrl: './user-categories.css'
})
export class UserCategoriesComponent {

  selectedCategory = 'plants';
  sortOption = '';

  categories = [
    'plants',
    'seeds',
    'tools',
    'fertilizers'
  ];

  products = [

    { id:1, name:'Snake Plant', category:'plants', price:299, image:'assets/images/snake plant.jpg' },
    { id:2, name:'Money Plant', category:'plants', price:199, image:'assets/images/money-plant.png' },
    { id:3, name:'Rose Plant', category:'plants', price:249, image:'assets/images/rose.png' },
    { id:4, name:'Tulsi Plant', category:'plants', price:149, image:'assets/images/tulsi-plant.png' },
    { id:5, name:'Aloe Vera', category:'plants', price:199, image:'assets/images/alovera.jpg' },

    { id:6, name:'Sunflower Seeds', category:'seeds', price:49, image:'assets/images/sunflower-seeds.png' },
    { id:7, name:'Rose Seeds', category:'seeds', price:99, image:'assets/images/rose-seeds.png' },

    { id:8, name:'Watering Can', category:'tools', price:199, image:'assets/images/watering-can.png' },
    { id:9, name:'Pruning Scissors', category:'tools', price:99, image:'assets/images/cutter.png' },

    { id:10, name:'Organic Fertilizer', category:'fertilizers', price:149, image:'assets/images/organic-fertilizer.png' },
    { id:11, name:'Chemical Fertilizer', category:'fertilizers', price:99, image:'assets/images/chemical-fertilizer.png' }

  ];

  get filteredProducts(){

    let filtered = this.products.filter(
      product => product.category === this.selectedCategory
    );

    if(this.sortOption === 'low'){
      filtered = filtered.sort((a,b)=>a.price-b.price);
    }

    if(this.sortOption === 'high'){
      filtered = filtered.sort((a,b)=>b.price-a.price);
    }

    return filtered;

  }

}