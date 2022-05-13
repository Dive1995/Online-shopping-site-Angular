import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-shipping',
  templateUrl: './checkout-shipping.component.html',
  styleUrls: ['./checkout-shipping.component.css']
})
export class CheckoutShippingComponent implements OnInit {
  @Output() goBack = new EventEmitter();
  @Output() setOption = new EventEmitter();
  @Output() goToPayment = new EventEmitter();

  @Input() deliveryOptions: any;

  @Input() selectedDeliveryOption: any;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
   
  }

  setDeliveryOptions(option: string){
    console.log("changing option : " + option);
    this.setOption.emit(option);
  }

  routeToInformation(){
    console.log("go back");
    
    this.goBack.emit();
  }

  routeToPayment(): void{
    this.goToPayment.emit(this.selectedDeliveryOption);
  }
}
