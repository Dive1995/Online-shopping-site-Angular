import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notification: any;
  notificationSource$ = new BehaviorSubject({ message: '', show: false, status: 'info' });

  constructor() { }

  getNotificationData(){
    return this.notificationSource$.asObservable();
  }

  showNotification(status: string, message: string){
    this.notification = { message: message, show: true, status: status };
    this.notificationSource$.next(this.notification);
  }

  hideNotification(){
    this.notification = { message: '', show: false, status: 'info' };
    this.notificationSource$.next(this.notification);
  }
}
