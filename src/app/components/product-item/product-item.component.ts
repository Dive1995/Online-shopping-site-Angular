import { compileDeclareInjectorFromMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICartItem } from 'src/app/models/cartItem';
import { IProduct } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  form!: FormGroup;
  product!: IProduct;
  formSubmitAttempt: boolean = false;
  errorMessage: string | undefined;
  id: number | undefined;
  selectedSize: string | undefined;


  constructor(
    private productService: ProductService, 
    private cartService: CartService, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"));

    this.productService.getSingleProduct(this.id).subscribe({
      next: (returnedProduct) => {
        this.product = returnedProduct;
        console.log(returnedProduct);
        
      },
      error: (err) => console.log(err.error),
      complete: () => console.log("completed")
       
    })

    this.form = this.formBuilder.group({
      size : ['', Validators.required],
      quantity: 1
    })
  }

  updateSize(size: string){
    this.selectedSize = size;
    console.log(this.selectedSize);
    
  }

  addToCart(){
    this.formSubmitAttempt = true;
    if(this.form.valid){
      const cartItem = { product: this.product , quantity: Number(this.form.value.quantity), size: this.form.value.size}
      this.cartService.addItemToCart(cartItem);
      // this.notificationService.showNotification("success", "Item added to cart successfully.");
    }
  }
  
}
 