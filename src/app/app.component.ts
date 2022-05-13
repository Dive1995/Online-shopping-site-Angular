import { Component, OnInit } from '@angular/core';
import { IProduct } from './models/product';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ShoppingFrontend';
  products: IProduct[] = [];
  errorMessage!: string;
  
  constructor(private productService: ProductService) {}


  ngOnInit(): void {
  //  this.productService.getProducts().subscribe({
  //    next: products => this.products = products,
  //    error: (err: string) => this.errorMessage = err
  //  });
   
  }
}
