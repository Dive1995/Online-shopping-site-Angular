import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  // selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  user: any;
  errorMessage!: string;
  attemptToSubmit: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private route: Router,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onLogin(): void{
    this.attemptToSubmit = true;

    if(this.form.valid){
      this.authService.logInUser(this.form.value).subscribe({
        next: (user: any) => {
          this.user = user;
          // this.notificationService.showNotification('success', `Hi ${user.userName}, enjoy your shopping !`)
          this.route.navigate(['/home'])
        },
        error: (err: any) => {
          console.log(err.error);
          this.notificationService.showNotification('danger', err.error)
        }
      })
      
      
    }else{
      console.log(this.form.errors);
      alert("failed! validation error")
    }
  }

  isValid(field: string) {
    return (
      (this.form.get(field)?.dirty || this.form.get(field)?.touched) 
      && !this.form.get(field)?.valid) 
      || (!this.form.get(field)?.valid && this.attemptToSubmit)
  }
}
