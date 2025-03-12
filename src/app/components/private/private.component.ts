import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-private',
  imports: [CommonModule, RouterModule],
  templateUrl: './private.component.html',
  styleUrl: './private.component.css'
})
export class PrivateComponent implements OnInit{
  profile:any;

  constructor(public auth:AuthService){}

  ngOnInit(){
    if(this.auth.userProfile){
      this.profile=this.auth.userProfile;
    }
    else{
      this.auth.getProfile((err:any,profile:any)=>{
        this.profile = profile;
      });
    }
  }

}
