import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user!: object;
  errorMessage!: object;
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: '',
      userName: '',
      password: ''
    });
  }

  onRegister(): void{
    console.log(this.registerForm.getRawValue());
    if(this.registerForm.valid){
      this.authService.registerUser(this.registerForm.getRawValue()).subscribe({
        next: (user: object) => this.user = user,
        error: (err: any) => this.errorMessage = err
      });
    }
  }

}
