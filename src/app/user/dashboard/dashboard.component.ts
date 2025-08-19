import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  imports: [NavBarComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {

  userName: string | null = null;

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.userName = this.authService.getLogginedUserName();
  }
}
