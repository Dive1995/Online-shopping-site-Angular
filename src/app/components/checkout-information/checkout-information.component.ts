import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';



@Component({
  selector: 'app-checkout-information',
  templateUrl: './checkout-information.component.html',
  styleUrls: ['./checkout-information.component.css']
})
export class CheckoutInformationComponent implements OnInit {
  informationForm!: FormGroup;
  attemptToSubmit: boolean = false;
  @Output() sendShippingDetails = new EventEmitter();
  @Input() existingShippingDetail: any;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private checkoutService: CheckoutService
    ) { }

  ngOnInit(): void {
    this.informationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      address: ['', [Validators.required, Validators.maxLength(250)]],
      postalCode: [null],
      phoneNum: [null, [Validators.required, Validators.pattern("^[0-9]{9}$")]]
    })

    if(this.existingShippingDetail){
      this.informationForm.setValue(this.existingShippingDetail);
    }

    console.log("Existing shipping : " + this.existingShippingDetail);
    
  }

  routeToShipping(): void{
    this.attemptToSubmit = true;

    if(this.informationForm.valid){
      this.sendShippingDetails.emit(this.informationForm.value);
    }
  }

  routeToCart(): void{
    if(this.informationForm.dirty){
      let response = confirm("Do you want to discard changes?")
      if(response){
        this.router.navigate(['/cart']);    
      }
    }
    else{
      this.router.navigate(['/cart']);
    }
  }

  isValid(field: string) {
    return (
      (this.informationForm.get(field)?.dirty || this.informationForm.get(field)?.touched) 
      && !this.informationForm.get(field)?.valid) 
      || (!this.informationForm.get(field)?.valid && this.attemptToSubmit)
  }
  
}
