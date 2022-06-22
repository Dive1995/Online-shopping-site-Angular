import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LocalstorageService } from './localstorage.service';
import { RefreshTokenService } from './refresh-token.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  //TODO: 1. Get delivery data from http
  //      2. Make order http request => Done

  private url = "http://localhost:5000/api/orders"
  header!: HttpHeaders;

  constructor(
    private http: HttpClient, 
    private authService: AuthService,
    private refreshTokenService: RefreshTokenService,
    private localStorageService: LocalstorageService
    ){
      this.header = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getUserToken());
    }

  async addNewOrder(data: any): Promise<Observable<any>>{
    if(this.isTokenExpired()){
      await this.getRefreshToken();
      this.header = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getUserToken());     
    }    
    return this.http.post<any>(this.url, data, {headers: this.header});
  }

  async getRefreshToken(){
    const oldtoken = this.authService.getUserToken();
    const user = await this.refreshTokenService.refreshToken();
    
    this.localStorageService.setItem('user', JSON.stringify(user));
    this.authService.userSubject.next(user);
    const newtoken = this.authService.getUserToken();
  }

  private isTokenExpired(): boolean{
    const token = this.authService.getUserToken();
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

}
