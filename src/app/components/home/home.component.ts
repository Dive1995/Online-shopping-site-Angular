import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductSection('men').subscribe(prod => this.products = prod)
  }

}
