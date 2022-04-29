import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IShippingInfo } from 'src/app/models/shippingInfo';

@Component({
  selector: 'app-checkout-information',
  templateUrl: './checkout-information.component.html',
  styleUrls: ['./checkout-information.component.css']
})
export class CheckoutInformationComponent implements OnInit {
  // form: FormGroup = new FormGroup();

  constructor() { }

  ngOnInit(): void {
  }

}
