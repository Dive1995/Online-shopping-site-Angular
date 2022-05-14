import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutInformationComponent } from './components/checkout-information/checkout-information.component';
import { CheckoutShippingComponent } from './components/checkout-shipping/checkout-shipping.component';
import { CheckoutPaymentComponent } from './components/checkout-payment/checkout-payment.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CheckoutGuard } from './guards/checkout.guard';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    ProductsPageComponent,
    ProductItemComponent,
    HomeComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    CheckoutInformationComponent,
    CheckoutShippingComponent,
    CheckoutPaymentComponent,
    PageNotFoundComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'products/:section', component: ProductsPageComponent },
      { path: 'product/:id', component: ProductItemComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', canActivate: [CheckoutGuard], component: CheckoutComponent, 
      // children:[
      //   { path: '', redirectTo: 'information', pathMatch: 'full' },
      //   { path: 'information', component: CheckoutInformationComponent },
      //   { path: 'shipping', component: CheckoutShippingComponent },
      //   { path: 'payment', component: CheckoutPaymentComponent },
      // ] 
    },
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: '**', component:PageNotFoundComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas,far)
  }
 }
