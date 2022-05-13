import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICartItem } from '../models/cartItem'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cart: ICartItem[] = [];
  private _total: number = 0;
  private _cartItemSource = new BehaviorSubject<ICartItem[]>([]);

  constructor() {
    let localStorageCart = localStorage.getItem('cart');
    if(localStorageCart){
      this._cart = JSON.parse(localStorageCart);
      this._cartItemSource.next(this._cart);
    }
  }

  calculateTotal(){
    this._cart.forEach((item) => this._total += item.product.price)
  }

  addItemToCart(productItem: ICartItem){
    if(this.findIndexOfProduct(productItem) == -1){
      this._cart.push(productItem);
      this._cartItemSource.next(this._cart); // to notify the subscriber a new product is added
      localStorage.setItem("cart", JSON.stringify(this._cart));
    }
    else{
      this.updateCart(productItem);
    }
  }

  updateCart(productItem: ICartItem){
    const index = this.findIndexOfProduct(productItem);
    this._cart[index].quantity = productItem.quantity;
    this._cartItemSource.next(this._cart);
    localStorage.setItem("cart", JSON.stringify(this._cart));
  }

  deleteItemFromCart(productItem: ICartItem){
    // const updatedCart = this._cart.filter(item => item.product.id == productItem.product.id && item.size !);
    let index = this.findIndexOfProduct(productItem);
    this._cart.splice(index,1)
    this._cartItemSource.next(this._cart);
    localStorage.setItem("cart", JSON.stringify(this._cart));
  }

  getCart(){
    return this._cartItemSource.asObservable();
  }

  clearCart(){
    this._cart = [];
    localStorage.setItem("cart", JSON.stringify(this._cart));
    this._cartItemSource.next(this._cart);
  }

  findIndexOfProduct(productItem: ICartItem): number{
    return this._cart.findIndex(item => item.product.id == productItem.product.id && item.size == productItem.size)
  }



}
