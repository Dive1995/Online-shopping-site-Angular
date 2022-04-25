import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ShoppingFrontend';
  products: any;
  errorMessage!: string;
  
  constructor(private productService: ProductService) {}


  ngOnInit(): void {
   this.productService.getProducts().subscribe({
     next: (products: any) => this.products = products,
     error: (err: string) => this.errorMessage = err
   });
   console.log(this.products);
   
  }
}
