import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = "http://localhost:5000/api/orders";
  header!: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.header = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getUserToken());
  }

  getAllOrders(): Observable<any>{
    const userId = this.authService.getUserId();
    return this.http.get<any>(`${this.url}/user/${userId}`, {headers: this.header})
  }

  getOrderById(id: number): Observable<any>{
    return this.http.get<any>(`${this.url}/${id}`, {headers: this.header});
  }
}
