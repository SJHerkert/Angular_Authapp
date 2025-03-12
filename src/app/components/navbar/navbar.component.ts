import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular'; //we can import this from auth= SDK to get to use the redirectMethods
import { AuthService as CustomAuthService } from '../../services/auth.service';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  providers: [      
    AuthService
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  
  constructor(public auth0: AuthService, public auth:CustomAuthService ) {}

  ngOnInit() {
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
