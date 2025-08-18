import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-under-construction',
  imports: [],
  templateUrl: './under-construction.component.html',
  styleUrl: './under-construction.component.css'
})
export class UnderConstructionComponent {

  constructor(private router: Router, private authService: AuthServiceService) {}

  goToHome() {
    if(this.authService.isLoggedIn()){
       this.router.navigate(['user-dashboard']);
    }
    else{
       this.router.navigate(['login']);
    }
  }
}
