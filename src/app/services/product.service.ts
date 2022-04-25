import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string = "http://localhost:5000/api/products/category/1";

  constructor(private http: HttpClient) { }

  getProducts(): any{
    return this.http.get(this.url);
  }
}
