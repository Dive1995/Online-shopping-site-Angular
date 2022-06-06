import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  order: any;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private orderService: OrderService, 
    private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    const param = Number(this.route.snapshot.paramMap.get('id')) || -1;
    console.log(param);
    this.orderService.getOrderById(param).subscribe({
      next: (data) => {
        this.order = data;
        console.log(this.order);
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['/orders'])
      },
      complete: () => this.loading = false
    })
  }

  convertDate(date: any){
    const orderDate = new Date(date);
    return orderDate.toDateString();
  }

}
