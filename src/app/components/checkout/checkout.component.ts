import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICartItem } from 'src/app/models/cartItem';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: ICartItem[] = [];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.cart = [
      { product: {id: 1, name: "Jeans", numOfStock: 4, image: "assets/images/img-3.jpg", price: 200, categoryId: 2}, quantity: 2, size: "s"},
    { product: {id: 1, name: "T Shirt", numOfStock: 4, image: "assets/images/img-3.jpg", price: 400, categoryId: 2}, quantity: 1, size: "m"}
  ];

  this.route.paramMap.subscribe(
    params => console.log(params.get('path'))
  )


}
}
