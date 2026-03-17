import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems:any[] = [];

  addToCart(product:any){
    this.cartItems.push(product);
  }

  getCartItems(){
    return this.cartItems;
  }

  getCartCount(){
    return this.cartItems.length;
  }

  removeItem(index:number){
    this.cartItems.splice(index,1);
  }

  getTotalPrice(){
    return this.cartItems.reduce((total,item)=> total + item.price,0);
  }

  clearCart(){
    this.cartItems = [];
  }

}