import {inject, Injectable} from '@angular/core';
import {ServerUrls} from "../urls";
import {Observable} from "rxjs";
import {Contest} from "../domain/contest";
import {AuthenticationService} from "./authentication.service";
import axios from "axios";

@Injectable()
export class ContestService {
  authenticationService: AuthenticationService = inject(AuthenticationService);

  constructor() { }

  async getContest(id: number) {
    return axios.get(ServerUrls.base + '/contest/' + id,

    {
      headers: {
        'Authorization': `Bearer ${this.authenticationService.getToken()}`
      }
    });

  }

  async getContestPage(id: number, index: number, page_size: number) {
    return axios.post(ServerUrls.base + '/contest/page', {
      'id': id,
      'index': index,
      'page_size': page_size
    }, {
      headers: {
        'Authorization': `Bearer ${this.authenticationService.getToken()}`
      }
    });
  }

  async submitSubmission(file: File, contestId: number) {
    const formData = new FormData();
    formData.append('user_id', this.authenticationService.get_current_user().user_id)
    formData.append('contest_id', contestId.toString());
    formData.append('binary_model', file);
    return axios.post(ServerUrls.base + '/submit', formData, {
      headers: {
        'Authorization': `Bearer ${this.authenticationService.getToken()}`,
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}