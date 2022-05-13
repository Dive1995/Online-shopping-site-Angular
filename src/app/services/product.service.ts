import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string = "http://localhost:5000/api/products";
  // products: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([])

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(`${this.url}/category/1`);
  }

  getProductSection(section: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}/section/${section}`);
  }


  getSingleProduct(id: number): Observable<IProduct>{
    return this.http.get<IProduct>(`${this.url}/${id}`)
  }

  // getCategories(section: string){
  //   return this.http.get(`${this.url}`)
  // }
}
