import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html'
})
export class ProductsComponent implements OnInit {

  products:any[] = [];
  selectedFile:any;
  categories:any[] = [];
  types:string[] = [];

  newProduct:any = {
    name:'',
    price:null,
    stock:null,
    category:'',  
    type:'',
    description:'',
    image:'',
  };

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private categoryService: CategoryService,   // ✅ ADD

  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();   // ✅ ADD

  }

  loadProducts() {
    this.productService.getProducts().subscribe((res:any) => {
      console.log("🔥 DATA:", res);
      this.products = res || [];
      this.cdr.detectChanges();
    });
  }

  // ✅ IMAGE SELECT
  onImageUpload(event:any){
    this.selectedFile = event.target.files[0];
  }

  // ✅ ADD PRODUCT (UPDATED)
addProduct(form:any){

  if(!this.newProduct.name || !this.newProduct.price || !this.newProduct.category){
    alert("Please fill all fields");
    return;
  }

  const formData = new FormData();

  formData.append('name', this.newProduct.name);
  formData.append('price', this.newProduct.price);
  formData.append('stock', this.newProduct.stock);
  formData.append('category', this.newProduct.category);
  formData.append('type', this.newProduct.type);
  formData.append('description', this.newProduct.description);

  if(this.selectedFile){
    formData.append('image', this.selectedFile);
  }

  this.productService.addProduct(formData).subscribe({
    next: (res:any) => {

      res.image = 'http://localhost:3000/uploads/' + res.image;

      this.products.unshift(res);
      this.cdr.detectChanges();

      // ✅ FORM RESET (important)
      form.resetForm();

      // ✅ VARIABLES RESET
      this.selectedFile = null;
      this.types = [];

      // ✅ MODAL CLOSE
      const modal = document.getElementById('addProductModal');
      if(modal){
        const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
        bootstrapModal?.hide();
      }

    },
    error: (err) => {
      console.log(err);
      alert("Error saving product");
    }
  });
}

 deleteProduct(id:any){
  console.log("DELETE CLICKED:", id);   // 🔥 ADD THIS

  this.productService.deleteProduct(id).subscribe({
    next:()=>{
      console.log("DELETED SUCCESS");

      this.products = this.products.filter(p => p._id !== id);
      this.cdr.detectChanges();
    },
    error:(err)=>{
      console.log("DELETE ERROR:", err);
    }
  });
}

loadCategories(){
  this.categoryService.getCategories().subscribe((res:any)=>{
  this.categories = res;
});
}

onCategoryChange(){
  const selected = this.categories.find(c => c._id === this.newProduct.category);

  this.types = selected?.types || [];
}
}