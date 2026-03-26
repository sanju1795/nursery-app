import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html'
})
export class CategoriesComponent implements OnInit {

  categories:any[] = [];
  categoryName = '';

  constructor(private service: CategoryService , private cdr: ChangeDetectorRef){}

  ngOnInit(){
    this.loadCategories(); // 🔥 always load from DB
  }

  // 🔥 LOAD FROM DB
  loadCategories(){
  this.service.getCategories().subscribe((res:any)=>{
    console.log("LOADED:", res);

    this.categories = res || [];

    this.cdr.detectChanges(); // 🔥 IMPORTANT FIX
  });
}

  // 🔥 ADD CATEGORY
  addCategory(){

    if(this.categoryName.trim() === '') return;

    this.service.addCategory({ name: this.categoryName })
      .subscribe({
        next: (res:any)=>{
          console.log("ADDED:", res);

          // 🔥 IMPORTANT: reload from DB
          this.loadCategories();

          this.categoryName = '';
        },
        error: (err)=>{
          console.error("ADD ERROR:", err);
        }
      });
  }

  // 🔥 DELETE
  deleteCategory(id:any){
    this.service.deleteCategory(id).subscribe(()=>{
      this.loadCategories(); // 🔥 reload again
    });
  }

}