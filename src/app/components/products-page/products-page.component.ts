import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  productSubscription!: Subscription;
  paramSubscription!: Subscription;
  section!: string;
  products: IProduct[] = [];
  isLoading: boolean = false;
  errorMessage: string | undefined;
  // womensProducts: IProduct[] = []
  // kidsProducts: IProduct[] = []

  constructor(private productService: ProductService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    console.log("Product page is initialized");
    this.paramSubscription = this.route.paramMap.subscribe(params => {
      this.section = String(params.get('section'));
      this.getProducts(String(params.get('section')));
    });
    
  }
  
  getProducts(section: string){
    this.isLoading = true;
    this.productSubscription = this.productService.getProductSection(section).subscribe({
      next: returnedProducts => this.products = returnedProducts,
      error: error => {
        this.errorMessage = error,
        console.log(this.errorMessage);
        
      }, 
      complete: () => this.isLoading = false
    })
  }
  
  ngOnDestroy(): void {
    console.log("Product page has been closed");
    
    this.productSubscription.unsubscribe();
    this.paramSubscription.unsubscribe();
  }

}
