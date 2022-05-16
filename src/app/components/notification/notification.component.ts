import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notification: any;
  borderColor!: string;
  notificationSubscription!: Subscription;
  timeout: any;


  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationSubscription = this.notificationService.getNotificationData().subscribe(
      data => {
        this.notification = data;
        this.borderColor = this.generateBorderColor(data.status);
        this.clearTimeOut();
        this.startNotificationTimer();
      }
    );
  }

  close(){
    this.notificationService.hideNotification();
  }

  startNotificationTimer(){
    this.timeout = setTimeout(() => {
      this.close();
      this.notificationSubscription.unsubscribe();
    }, 2500)
  }

  clearTimeOut(){
    clearTimeout(this.timeout);
  }

  generateBorderColor(status: string): string{
    if(status == "danger"){
      return '#CB213E';
    }
    else if(status == "success"){
      return '#1DC17D';
    }
    else
      return '#a09cb0';
  }

}
