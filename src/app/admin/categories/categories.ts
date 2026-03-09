import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html'
})
export class CategoriesComponent {

  categoryName = '';

  categories:any[] = [
    { id:1, name:'Indoor Plants'},
    { id:2, name:'Outdoor Plants'},
    { id:3, name:'Seeds'}
  ];

  addCategory(){

    if(this.categoryName.trim() === '') return;

    this.categories.push({
      id: Date.now(),
      name: this.categoryName
    });

    this.categoryName='';
  }

  deleteCategory(id:number){
    this.categories = this.categories.filter(c => c.id !== id);
  }

}