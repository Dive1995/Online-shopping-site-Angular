import { Component, OnInit } from '@angular/core';
import { IProduct } from './models/product';
import { NotificationService } from './services/notification.service';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ShoppingFrontend';
  showNotification!: boolean;
  
  constructor(private nofificationService: NotificationService) {}


  ngOnInit(): void {
    this.nofificationService.getNotificationData().subscribe(
      data => this.showNotification = data.show
    );
  }
}
