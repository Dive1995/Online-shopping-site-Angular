import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product!: IProduct;

  constructor() { }

  ngOnInit(): void {
    
  }

  addToCart(): void{
    console.log("Adding item to cart.");
    
  }

}
