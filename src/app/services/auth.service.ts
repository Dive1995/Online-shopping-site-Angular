import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = "http://localhost:5000/api/users";

  constructor(private http: HttpClient) { }

  logInUser(body: any): any{
    return this.http.post(`${this.url}/login`, body).pipe(
      tap((response: any) => localStorage.setItem('user', JSON.stringify(response)))
    );
  }

  registerUser(body: any): any{
    return this.http.post(`${this.url}/register`, body).pipe(
      tap((response: any) => localStorage.setItem('user', JSON.stringify(response)))
    );
  }
}
