import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CartComponent } from '../components/cart/cart.component';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {
  constructor(
    private cartService: CartService, 
    private authService: AuthService,
    private route: Router,
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let access = true;
    // this.cartService.getCart().subscribe(data => {
    //   if(data.length == 0){
    //     access = false;
    //   }
    // } )
    // this.authService.getUser().subscribe(data => {
    //   if(data == null){
    //     access = false;
    //     this.route.navigate(['/login'])
    //   }
    // })
    // return access;

    if(this.authService.isLoggedIn() && this.cartService.isCartEmpty()){
      return true;
    }
    else{
      this.route.navigate(['/login']);
      return false;
    }
  }
  
}
