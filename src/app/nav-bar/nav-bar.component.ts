import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})

export class NavBarComponent implements OnInit {

  isLoggedIn = false;
  userName: string | null = null;
  dropdownOpen = false;

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.userName = this.authService.getLogginedUserName();
    }
    else {
      this.isLoggedIn = false;
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.dropdownOpen = false;
    this.authService.logoutUser();
    this.router.navigate(['login']);
  }

  goToMainPage() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['user-dashboard']);
    }
    else {
      this.router.navigate(['']);
    }
  }
}
