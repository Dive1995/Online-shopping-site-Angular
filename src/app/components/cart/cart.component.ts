import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICartItem } from 'src/app/models/cartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: ICartItem[] = [];

  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.cart = [
      { product: {id: 1, name: "Jeans", numOfStock: 4, image: "assets/images/img-3.jpg", price: 200, categoryId: 2}, quantity: 2, size: "s"},
    { product: {id: 1, name: "T Shirt", numOfStock: 4, image: "assets/images/img-3.jpg", price: 400, categoryId: 2}, quantity: 1, size: "m"}
  ];
  }

  goToPreviousPage():void{
    this.location.back();
  }

  checkout():void{
    // logics

    this.router.navigate(["/checkout/information"]);
  }

}
