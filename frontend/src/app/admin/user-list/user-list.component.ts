import { Component, inject } from '@angular/core';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {IUser} from "../../domain/user";
import {UserType} from "../../domain/user";
import {SocketOne} from "../../app.component";
import {AdminService} from "../../services/admin.service";


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink,NgFor, NgForOf, NgIf],
  template: `
    <table>
      <tr>
        <th> TYPE </th>
        <th> USERNAME </th>
        <th> </th>
        <th> </th>
      </tr>
      <tr *ngFor="let user of currentUsers">
        <td [textContent]="user.user_type"> </td>
        <td [textContent]="user.username"> </td>
        <td>
          <a routerLink="/update_user/{{user.id}}"> <button> update </button> </a>
        </td>
        <td>
          <button *ngIf="user.user_type!='admin'" (click)="remove(user.id)"> remove </button>
        </td>
      </tr>
    </table>
  `,
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  service=inject(AdminService)
  socket=inject(SocketOne)
  currentUsers:IUser[]=[]
  constructor(){
    this.socket.on('refresh-users', (data:any)=>{
      this.update()
    })
    this.update()
  }
  async update(){
    this.service.getUserPage(1,100).then((response)=>{
      this.currentUsers=response
    }).catch((error)=>{
      alert(error)
    })
  }
  async remove(id:number){
    this.service.removeUser(id)
      .then((response) => {
        alert('User removed')
      })
      .catch((response)=>{
        alert(response.message)
      })
  }
}
