import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from '@auth0/auth0-angular';
import { AuthService as CustomAuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    // AppRoutingModule,
    CommonModule, 
    NavbarComponent         
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'authapp';

  constructor(public auth:CustomAuthService){
    auth.handleAuthentication();
  }

  ngOnInit() {
    if(this.auth.isAuthenticated()){
      //this.auth.renewTokens();
    }
    
  }

}
