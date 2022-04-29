import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  // selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  user: any;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ''
    })
  }

  onLogin(): void{
    // console.log(this.form.getRawValue());
    if(this.form.valid){
      this.authService.logInUser(this.form.getRawValue()).subscribe({
        next: (user: any) => this.user = user,
        error: (err: string) => this.errorMessage = err
      })
      
      
    }else{
      console.log(this.form.errors);
      alert("failed! validation error")
    }
    console.log(this.user);
  }
}
