import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = "http://localhost:5000/api/users";
  userSubject!: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    const userData = localStorage.getItem('user');
    this.userSubject = new BehaviorSubject<any>(userData != null ? JSON.parse(userData).user : null);
  }

  logInUser(body: any): any{
    return this.http.post(`${this.url}/login`, body).pipe(
      tap((response: any) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.userSubject.next(response);
      })
    );
  }

  registerUser(body: any): any{
    return this.http.post(`${this.url}/register`, body).pipe(
      tap((response: any) => localStorage.setItem('user', JSON.stringify(response.user)))
    );
  }

  getUser(){
    return this.userSubject.asObservable();
  }

  getUserId(){
    return this.userSubject.value.id
  }

  getUserToken(){
    return this.userSubject.value.token;
  }

  logOutUser(): void{
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }
}
