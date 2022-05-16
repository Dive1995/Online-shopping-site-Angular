import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cart: ICartItem[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService, 
    private location: Location, 
    private router: Router,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
    console.log("cart component");
    this.cartService.getCart().subscribe({
      next: data => this.cart = data,
      error: err => console.log(err)
    });
    this.calculateTotal()
  }


  calculateTotal(){
    this.total = 0;
    this.cart.forEach((item) => {
      this.total += item.product.price * item.quantity;
    });
  }

  updateCart(productItem: ICartItem, quantity: number){
    this.cartService.updateCart({...productItem, quantity});
    this.calculateTotal();
  }

  removeItem(productItem: ICartItem){
    this.cartService.deleteItemFromCart(productItem);
    this.notificationService.showNotification('info', 'Item removed from cart.')
  }

  goToPreviousPage():void{
    console.log("back");
    
    this.location.back();
  }

  checkout():void{
    // logics

    this.router.navigate(["/checkout"]);
  }

}
