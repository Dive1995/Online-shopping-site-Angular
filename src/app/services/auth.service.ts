import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = "http://localhost:5000/api/users";
  userSubject!: BehaviorSubject<any>;

  constructor(
    private http: HttpClient,
    private localstorageService: LocalstorageService
    ) {
    const userData = localstorageService.getItem('user');
    console.log(userData);
    this.userSubject = new BehaviorSubject<any>(userData != null ? JSON.parse(userData) : null);
  }

  logInUser(body: any): any{
    return this.http.post(`${this.url}/login`, body, {withCredentials: true}).pipe(
      tap((response: any) => {
        console.log("Response for login fn : "+response);
        this.localstorageService.setItem('user', JSON.stringify(response));
        this.userSubject.next(response);
      })
    );
  }

  registerUser(body: any): any{
    return this.http.post(`${this.url}/register`, body, {withCredentials: true}).pipe(
      tap((response: any) => this.localstorageService.setItem('user', JSON.stringify(response.user)))
    );
  }

  getUser(){
    return this.userSubject.asObservable();
  }

  getUserId(){
    return this.userSubject.value.id;
  }

  getUserValue(){
    return this.userSubject.value;
  }

  getUserToken(){
    return this.userSubject.value.token;
  }

  logOutUser(): void{
    this.userSubject.next(null);
    this.localstorageService.removeItem('user');
  }

  isLoggedIn(): boolean{
    return this.userSubject.value ? true : false;
  }
}
