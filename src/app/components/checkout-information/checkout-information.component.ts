import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IShippingInfo } from 'src/app/models/shippingInfo';

@Component({
  selector: 'app-checkout-information',
  templateUrl: './checkout-information.component.html',
  styleUrls: ['./checkout-information.component.css']
})
export class CheckoutInformationComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeToShipping(): void{

    this.router.navigate(['/checkout/shipping']);
  }
}
