import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ICartItem } from 'src/app/models/cartItem';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: ICartItem[] = [];
  total: number = 0;
  subtotal: number = 0;

  step: number = 1;

  paymentMethod: string = 'cash on delivery'

  // shipping information
  shipping: any | undefined;

  


  // TODO:  
  // create array of delivery options => { type:, price:, days: }
  deliveryOptions = [
    { type: 'standard', price: 350, days: 6 },
    { type: 'express', price: 750, days: 2 },
  ]
  // create a selected delivery option field
  selectedDeliveryOption: any = 'standard'

  // set standard price as selected
  shippingPrice!: number;


  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private authService: AuthService 
    ) { }

  ngOnInit(): void {    
    this.cartService.getCart().subscribe(data => this.cart = data);
    this.shippingPrice = this.deliveryOptions.find(item => item.type == this.selectedDeliveryOption)?.price || 0;
    this.calculateTotal();
  }

  goToPreviousStep(){
    if(this.step > 1){
      this.step--;
    }
  }

  geToNextStep(){
    this.step++;
  }

  getShipping($event: any){
    this.shipping = $event;
    console.log("Checkout component get the shipping : " + JSON.stringify(this.shipping));
    this.geToNextStep();
  }

  setDeliveryOption($event: any){
    console.log("selected" + JSON.stringify($event));
    
    this.selectedDeliveryOption = $event;
    this.shippingPrice = this.deliveryOptions.find(item => item.type == this.selectedDeliveryOption)?.price || 0;
    this.calculateTotal();
  }

  goToPaymentPage($event: any){
    console.log("Got payment option : " + JSON.stringify($event));
   
    this.geToNextStep();
  }

  confirmOrder($event: any){
    this.paymentMethod = $event;
    let orderItems = this.cart.map(item => {
      return { productId: item.product.id, quantity: Number(item.quantity), size: item.size }
    });
    let shipping = {status: "ordered", ...this.shipping}

    let order = {
      "customerId": this.authService.getUserId(),
      "OrderItems": orderItems,
      "shipping": shipping,
      "invoice": {
          "total": this.subtotal,
          "paymentMethod": this.paymentMethod
      }
    }
    console.log(order);


    this.checkoutService.addNewOrder(order).subscribe(
      data => {
        console.log(data);
        alert(data.message);
        this.cartService.clearCart();
        //TODO: route to invoice
      },
      error => console.log(error)
    )
  }

  calculateTotal(){
    this.total = 0;
    this.cart.forEach((item) => {
      this.total += item.product.price * item.quantity;
    });
    this.subtotal = this.total + this.shippingPrice;
  }
}
