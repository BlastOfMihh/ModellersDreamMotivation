import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Contest} from "../domain/contest";
import {ServerUrls} from "../urls";
import {IUserData} from "../domain/user-data";
import {UserType} from "../domain/user";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  login(){
  }
  getToken(){
    return localStorage.getItem('jwt_token')
  }
  get_current_user(){
    return {
      username: localStorage.getItem('username'),
      user_type: localStorage.getItem('user_type'),
      user_id: localStorage.getItem('user_id')
    }
  }
  hasWriteAcces():boolean{
    let user_type=localStorage.getItem('user_type')
    if (user_type !== null ){
      return [UserType.ADMIN, UserType.MANAGER].includes(user_type)
    }
    return false
  }
  isAdmin():boolean{
    let user_type=localStorage.getItem('user_type')
    if (user_type !== null ){
      return user_type==UserType.ADMIN
    }
    return false
  }
  // isAuth(){
  //   axios.get(ServerUrls.base + "/",
  //     { headers:
  //         { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` } 
  //     }
  //   )
  // }
}
