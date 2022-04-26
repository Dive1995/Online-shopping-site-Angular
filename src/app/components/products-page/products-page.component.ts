import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  @Input() products: any;

  constructor() { }

  ngOnInit(): void {
  }

}