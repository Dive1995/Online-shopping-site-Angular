import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-shipping',
  templateUrl: './checkout-shipping.component.html',
  styleUrls: ['./checkout-shipping.component.css']
})
export class CheckoutShippingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeToPayment(): void{
    this.router.navigate(['/checkout/payment']);
  }

}
