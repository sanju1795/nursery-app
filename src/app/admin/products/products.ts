import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html'
})
export class ProductsComponent implements OnInit {

  products:any[] = [];
  selectedFile:any;

  newProduct:any = {
    name:'',
    price:null,
    stock:null,
    category:'',   // ✅ ADD
    image:''
  };

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProducts();
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

    const formData = new FormData();

    formData.append('name', this.newProduct.name);
    formData.append('price', this.newProduct.price);
    formData.append('stock', this.newProduct.stock);
    formData.append('category', this.newProduct.category); // ✅ IMPORTANT

    if(this.selectedFile){
      formData.append('image', this.selectedFile);
    }

    this.productService.addProduct(formData).subscribe((res:any) => {

      // 🔥 instant UI update
      this.products.unshift(res);
      this.cdr.detectChanges();

      // reset form
      this.newProduct = {
        name:'',
        price:null,
        stock:null,
        category:'',
        image:''
      };

      this.selectedFile = null;

      // close modal
      const modal = document.getElementById('addProductModal');
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modal);
      modalInstance?.hide();
    });

  }

  deleteProduct(id:any){
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(p => p._id !== id);
      this.cdr.detectChanges();
    });
  }

}