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
  addProduct(){

  if(!this.newProduct.name || !this.newProduct.price || !this.newProduct.category){
    alert("Please fill all fields");
    return;
  }

  const productData = {
    name: this.newProduct.name,
    price: this.newProduct.price,
    stock: this.newProduct.stock,
    category: this.newProduct.category,
    type: this.newProduct.type,
    description: this.newProduct.description,
    image: this.newProduct.image   // 👈 direct path
  };

  this.productService.addProduct(productData).subscribe({
    next: (res:any) => {
      console.log("Saved:", res);

      this.products.unshift(res);
      this.cdr.detectChanges();

      this.newProduct = {
  name:'',
  price:null,
  stock:null,
  category:'',
  type:'',
  description:'',
  image:''
};

const modalElement = document.getElementById('addProductModal');
const modal = (window as any).bootstrap.Modal.getInstance(modalElement);

if(modal){
  modal.hide();
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