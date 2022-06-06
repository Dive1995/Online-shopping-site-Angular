import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryOptionsService } from 'src/app/services/delivery-options.service';

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

  constructor() { }

  ngOnInit(): void {
   
  }

  calculateDays(day: number){
    let today = new Date();
    const expectedDeliveryDate = new Date(today.setDate(today.getDate() + day));
    return expectedDeliveryDate.toDateString();
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
