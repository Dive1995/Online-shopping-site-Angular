import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notification: any;
  borderColor!: string;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.getNotificationData().subscribe(
      data => {
        this.notification = data;
        this.borderColor = this.generateBorderColor(data.status)
      }
    );
  }

  close(){
    this.notificationService.hideNotification();
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
