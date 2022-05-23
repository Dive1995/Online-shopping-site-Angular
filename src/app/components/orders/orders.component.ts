import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any;
  isLoading!: boolean;

  constructor(private orderService: OrderService) { }
  
  ngOnInit(): void {
    this.isLoading = true;
    this.orderService.getAllOrders().subscribe({
      next: data => {
        this.orders = data.orders;
        console.log(this.orders)
      },
      error: err => console.log(err),
      complete: () => this.isLoading = false
    })
  }

  viewOrderItem(data: any){
    console.log("Opening item : " + data);
  }

  convertDate(date: any){
    const orderDate = new Date(date);
    return orderDate.toLocaleString();
  }
}
