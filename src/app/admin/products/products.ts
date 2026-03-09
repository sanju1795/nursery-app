import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html'
})
export class ProductsComponent {

  products:any[] = [
    {
      name:'Money Plant',
      price:250,
      stock:20,
      image:'https://via.placeholder.com/50'
    }
  ];

  newProduct:any = {
    name:'',
    price:'',
    stock:'',
    image:''
  };

  addProduct(){

    this.products.push({...this.newProduct});

    this.newProduct = {
      name:'',
      price:'',
      stock:'',
      image:''
    };

  }

  deleteProduct(index:number){
    this.products.splice(index,1);
  }

}