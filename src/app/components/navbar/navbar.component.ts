import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartCount: number = 0;
  user: any = null;

  constructor(
    private cartService: CartService, 
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cartCount = 0;
      cart.forEach(item => this.cartCount += Number(item.quantity))
    })

    this.authService.getUser().subscribe(
      (userData) => {
        this.user = userData;
        console.log(userData);
      }
    )
  }

  logOut(){
    console.log("logout");
    this.cartService.clearCart();
    this.authService.logOutUser();
    this.router.navigate(['/login']);
  }

}
