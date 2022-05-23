import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private url = "http://localhost:5000/api/mail"

  constructor(private http: HttpClient) { }

  sendOrderSuccessEmail(emailContent: any): Observable<any>{
    return this.http.post<any>(`${this.url}/orderSuccess`, emailContent)
  }

}
