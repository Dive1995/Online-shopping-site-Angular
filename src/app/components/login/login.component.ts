import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  attemptToSubmit: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private route: Router
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onLogin(): void{
    // console.log(this.form.getRawValue());
    this.attemptToSubmit = true;

    if(this.form.valid){
      this.authService.logInUser(this.form.value).subscribe({
        next: (user: any) => {
          this.user = user;
          this.route.navigate(['/home'])
        },
        error: (err: any) => console.log(err.error)
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
