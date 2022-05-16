import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user!: object;
  errorMessage!: object;
  registerForm!: FormGroup;
  attemptToSubmit: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')]]
    });
  }

  onRegister(): void{
    this.attemptToSubmit = true;

    if(this.registerForm.valid){
      this.authService.registerUser(this.registerForm.value).subscribe({
        next: (user: object) => {
          this.user = user;
          this.notificationService.showNotification('success','Regitered successfully !');
        },
        error: (err: any) => this.errorMessage = err
      });
    }
  }

  isValid(field: string) {
    return (
      (this.registerForm.get(field)?.dirty || this.registerForm.get(field)?.touched) 
      && !this.registerForm.get(field)?.valid) 
      || (!this.registerForm.get(field)?.valid && this.attemptToSubmit)
  }

}
