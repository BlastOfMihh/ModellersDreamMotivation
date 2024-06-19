import {Injectable} from "@angular/core";
import axios from 'axios'
import {ServerUrls} from "../urls";
import {IUser} from "../domain/user";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  async getUserPage(page_index:number, page_size:number):Promise<IUser[]>{
    return new Promise((resolve, reject)=>{
      axios.get(ServerUrls.base + "/users",
        { headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` } }
      ).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  async removeUser(id:number){
    return new Promise((resolve, reject) => {
      axios.delete(ServerUrls.base + "/users/" + id, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }
      }).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  async getUser(id:number){
    return new Promise((resolve, reject) => {
      axios.get(ServerUrls.base + "/users/" + id, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }
      }).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  async updateUser(id:number, user_type:string)
  {
    return new Promise((resolve, reject) => {
      axios.put(ServerUrls.base + "/users", {
          id: id,
          user_type: user_type
        },
        {
          headers: {Authorization: `Bearer ${localStorage.getItem('jwt_token')}`}
        }).then((response) => {
        resolve(response)
      }).catch((reason) => {
        reject(reason)
      })
    })
  }
}
