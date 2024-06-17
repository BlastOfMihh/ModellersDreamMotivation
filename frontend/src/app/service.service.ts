import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ServerUrls} from "./urls";
import {Observable} from "rxjs";
import {Contest} from "./domain/contest";

@Injectable({
  providedIn: 'root'
})
export class Service {
  http:HttpClient=inject(HttpClient)
  constructor() { }
  getContest(id:number) : Observable<Contest>{
    return this.http.get<Contest>(ServerUrls.base+'/contest/'+id, {})
  }
  getContestPage(id:number, index:number, page_size) : Observable<Contest>{
    return this.http.post<Contest>(ServerUrls.base+'/contest/'+id, {
      'id':id,
      'index':index,
      'page_size':page_size
    })
  }
}
