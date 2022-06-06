import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDeliveryOptions } from '../models/deliveryOptions';

@Injectable({
  providedIn: 'root'
})
export class DeliveryOptionsService {
  url: string = "http://localhost:5000/api/delivery";

  constructor(private http: HttpClient) { }

  public getDeliveryOptions(): Observable<IDeliveryOptions[]>{
    return this.http.get<IDeliveryOptions[]>(this.url);
  }

}
