import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  //TODO: 1. Get delivery data from http
  //      2. Make order http request => Done

  private url = "http://localhost:5000/api/orders"

  constructor(private http: HttpClient, private authService: AuthService){}

  addNewOrder(data: any): Observable<any>{
    var header = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getUserToken());
    return this.http.post<any>(this.url, data, {headers: header});
  }

  // private _checkoutSource = new BehaviorSubject<any>({ shipping: null});
  // private _orderDetails: any;
  
  // constructor() {
    // let orderDetail = localStorage.getItem('order')
    // console.log("Order detail from localstorage : " + orderDetail);
    // this._orderDetails = orderDetail ? JSON.parse(orderDetail) : { shipping: null, orderItems: [], customerId: null, invoice: null };
  // }

  // addShippingDetail(details: any){
  //   this._orderDetails.shipping = details;
  //   localStorage.setItem('order', JSON.stringify(this._orderDetails));
  //   this._checkoutSource.next(this._orderDetails)
  // }

  // getOrderDetails(){
  //   return this._checkoutSource.asObservable();
  // }



}
