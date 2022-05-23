import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ICartItem } from 'src/app/models/cartItem';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { EmailService } from 'src/app/services/email.service';
import { NotificationService } from 'src/app/services/notification.service';

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

  
  deliveryOptions = [
    { type: 'standard', price: 350, days: 6 },
    { type: 'express', price: 750, days: 2 },
  ]

  selectedDeliveryOption: any = 'standard'

  shippingPrice!: number;

  // returned order details
  orderDetailsReturned: any;


  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private authService: AuthService,
    private route: Router,
    private notificationService: NotificationService,
    private emailService: EmailService 
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

    this.checkoutService.addNewOrder(order).subscribe({
      next: data => {
        this.orderDetailsReturned = data;
        this.cartService.clearCart();
        this.notificationService.showNotification('success',data.message);
        this.route.navigate([`/order/${data.order.id}`]);
      },
      error: error => console.log(error),
      complete: () => console.log("email sent")
    })
  }

  sendSuccessEmail(order: any){
    // TODO: 
    // 1. Call an email service
    this.emailService.sendOrderSuccessEmail({
      toEmail: 'diveshan@gmail.com',
      subject: "Order Confirmation.",
      body: "<h1 style='color: gold'>Thank You for shopping with us</h1>"
    }).subscribe({
      next: data => console.log("Data returned from email res : "+data),
      error: (err) => console.log("Error occured in email req : "+err),
      complete: () => console.log("Email has been send")
    })

    // 2. Pass order detail to order item page
    // 3. Send the email as
    // {
    // "toEmail": "dmail@gmail.com",
    // "subject": "Order confirmation.",
    // "body": "Order item html"
    // }
  }

  calculateTotal(){
    this.total = 0;
    this.cart.forEach((item) => {
      this.total += item.product.price * item.quantity;
    });
    this.subtotal = this.total + this.shippingPrice;
  }
}
