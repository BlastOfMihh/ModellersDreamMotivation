import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../domain/user';
import { FormsModule } from '@angular/forms';
import { MotivationService } from '../services/motivation.service';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [NgFor, FormsModule],
  template:`
    <!-- NAME <input>  -->
    <br>
    <select [(ngModel)]="selectedUserType">
      <option *ngFor="let userType of userTypes" > {{userType}} </option>
    </select>
    <br>
    <button (click)="updateUser()"> UPDATE </button>
  `,
})
export class UserUpdateComponent {
  userTypes:string[]=["basic", "manager", "admin"]
  route: ActivatedRoute = inject(ActivatedRoute);
  userId:number
  selectedUserType=this.userTypes[0]
  service:MotivationService=inject(MotivationService)
  router:Router=inject(Router)
  constructor(){
    this.userId=Number(this.route.snapshot.params['id']);
  }
  updateUser(){
    this.service.updateUser(this.userId, this.selectedUserType)
    this.router.navigate(["/admin_panel"])
  }
}
