import { Component, inject } from '@angular/core';
import axios from 'axios';
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';
import {ServerUrls} from "../urls";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  template:`
    USERNAME <input [(ngModel)]="user.username">
    <br>
    PASSWORD <input type="password" [(ngModel)]="user.password">
    <br>
    <button (click)="this.login()"> enter the matrix</button>
  `,
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  router:Router=inject(Router)
  user={
    username:"",
    password:""
  }
  constructor(){
  }
  set_token(){
  }
  async login(){
    let response = await axios.post( ServerUrls.base+"/login", {
      "username":this.user.username,
      "user_type":"basic",
      "password":this.user.password
    })
    if (response.status === 200){
      localStorage.setItem("jwt_token", response.data.access_token)
      localStorage.setItem("user_type", response.data.user_type)
      localStorage.setItem("user_id", response.data.id)
      if (response.data.user_type=='admin')
        this.router.navigate(["/contest/1"])
      else
        this.router.navigate(["/contest/1"])
        // this.router.navigate(["/"])
    }else{
      alert("bad login attempt")
    }
  }
}
