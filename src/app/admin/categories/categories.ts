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
  categoryTypes = '';
  selectedCategory:any = null;
  editCategoryName = '';
  editCategoryTypes = '';

  constructor(private service: CategoryService , private cdr: ChangeDetectorRef){}

  ngOnInit(){
    console.log("init called");
    this.loadCategories(); // 🔥 always load from DB
  }

  // 🔥 LOAD FROM DB
  loadCategories(){
  console.log("CALLING API...");   // 🔥 ADD

  this.service.getCategories().subscribe({
    next:(res:any)=>{
      console.log("DATA:", res);   // 🔥 ADD

      this.categories = res || [];
      this.cdr.detectChanges();
    },
    error:(err)=>{
      console.log("ERROR:", err);  // 🔥 ADD
    }
  });
}

  // 🔥 ADD CATEGORY
  addCategory(){

  if(this.categoryName.trim() === '') return;

  const typesArray = this.categoryTypes
    ? this.categoryTypes.split(',').map(t => t.trim())
    : [];

  const data = {
    name: this.categoryName,
    types: typesArray
  };

  this.service.addCategory(data).subscribe({
    next:(res:any)=>{
      this.loadCategories();

      this.categoryName = '';
      this.categoryTypes = '';

      this.cdr.detectChanges();

      const modalElement = document.getElementById('categoryModal');
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);

      if(modal){
        modal.hide();
      }
    }
  });
}

  // 🔥 DELETE
  deleteCategory(id:any){
    this.service.deleteCategory(id).subscribe(()=>{
      this.loadCategories(); // 🔥 reload again
    });
  }

  openEditModal(category:any){
  console.log("SELECTED:", category);  // 🔥 ADD

  this.selectedCategory = category;

  this.editCategoryName = category.name;

  this.editCategoryTypes = category.types
    ? category.types.join(', ')
    : '';

  const modalElement = document.getElementById('editCategoryModal');
  const modal = new (window as any).bootstrap.Modal(modalElement);

  modal.show();
}

updateCategory(){

  console.log("UPDATE CLICKED");

  if(!this.editCategoryName.trim()) return;

  const typesArray = this.editCategoryTypes
    ? this.editCategoryTypes.split(',').map(t => t.trim())
    : [];

  const data = {
    name: this.editCategoryName,
    types: typesArray
  };

  console.log("ID:", this.selectedCategory._id);
  console.log("DATA:", data);

  this.service.updateCategory(this.selectedCategory._id, data)
    .subscribe({
      next:(res:any)=>{
        console.log("UPDATED:", res);

        this.loadCategories();   // 🔥 table refresh

        this.editCategoryName = '';
        this.editCategoryTypes = '';

        this.cdr.detectChanges();

        const modalElement = document.getElementById('editCategoryModal');
        const modal = (window as any).bootstrap.Modal.getInstance(modalElement);

        if(modal){
          modal.hide();
        }
      },
      error:(err)=>{
        console.log("UPDATE ERROR:", err);
      }
    });
  }
}