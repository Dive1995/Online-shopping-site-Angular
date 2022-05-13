import { compileDeclareInjectorFromMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICartItem } from 'src/app/models/cartItem';
import { IProduct } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
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
  show:boolean = false;


  constructor(
    private productService: ProductService, 
    private cartService: CartService, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder
    ) {}

  ngOnInit(): void {
    console.log("Product item component initialized !");
    
    this.id = Number(this.route.snapshot.paramMap.get("id"));

    this.productService.getSingleProduct(this.id).subscribe({
      next: (returnedProduct) => this.product = returnedProduct,
      error: (err) => console.log(err.error),
      complete: () => console.log("completed")
       
    })

    this.form = this.formBuilder.group({
      size : ['', Validators.required],
      quantity: 1
    })
  }

  addToCart(){
    this.formSubmitAttempt = true;
    if(this.form.valid){
      console.log(this.form.value);
      const cartItem = { product: this.product , quantity: this.form.value.quantity, size: this.form.value.size}
      this.cartService.addItemToCart(cartItem)
    }
  }
  

//   addToCart(data: NgForm){
//     console.log("Add to cart");
//     console.log(data.value);
//     console.log(data.dirty);
// console.log(data.controls);
// Object.keys(data.controls).forEach(key => {
//   data.controls[key].markAsTouched();
// });
//   }

}
