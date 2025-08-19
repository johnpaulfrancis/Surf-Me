import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'; //For verifying the user input
import { LoginService } from '../services/login.service';
import { RouterLink, Router  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { HttpStatusCode } from '@angular/common/http';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, NavBarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  //loginForm :property of a class with FormGroup type
  //FormGroup is a type from Angular's Reactive Forms module. It is used to represent a collection of FormControl instances, which in turn represent individual form fields.
  //In this case, loginForm will hold the form group that contains several form controls (like name, email, and password)
  loginForm: FormGroup;

  //constructor is a special method that runs when the component is instantiated. In Angular, the constructor is typically used for dependency injection and initialization tasks
  constructor(private loginService: LoginService, private authService: AuthServiceService, private router: Router) {

    //inject(FormBuilder) is used to inject the FormBuilder service into the constructor.
    //FormBuilder is an Angular service that helps to create FormGroup and FormControl instances more easily and concisely
    //The inject() function is part of Angular's standalone component system
    const fb = inject(FormBuilder);

    //The group() method from FormBuilder is used to create a FormGroup.
    //Inside the group(), you define the form controls (like name, email, and password), and their initial values and validation rules
    this.loginForm = fb.group({
      UserName: ['', [Validators.required, Validators.maxLength(25)]],
      Password: ['', [Validators.required, Validators.maxLength(25)]]
    });
  }

  ngOnInit(): void {
      //clear token when visiting this component if already loggined
      this.authService.logoutUser();
  }

  btnLoginClick() {
    if (this.loginForm.valid) {
      const loginFromVal = this.loginForm.value;
      this.loginService.loginUserFunction(loginFromVal).subscribe({
        next: (response: any) => {
          if (response.statusCode == HttpStatusCode.Ok) {
            // Save token
            this.authService.setToken(response.token)
            // Navigate to dashboard
            this.router.navigate(['user-dashboard']);
          }
        },
        error: (err) => {
          const status = err?.status ?? 0; // safe check
          if (status == HttpStatusCode.Unauthorized) {
            alert("login failed");
          }
          else {
            alert("Internal server error");
          }
        }
      });
    }
    else {
      // Mark all controls as touched so validation messages show
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
        control?.markAsDirty();
      })
    }
  }
}
