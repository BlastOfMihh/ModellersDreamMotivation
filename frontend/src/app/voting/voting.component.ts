import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { ViewModelComponent } from 'src/app/model-display/model-display.component';
import {HttpClient} from "@angular/common/http";
import { CommonModule, NgFor, NgIf } from '@angular/common'; // import CommonModule
import { TemplateRef, ViewChild } from '@angular/core';
import { Contest, ContestStates } from 'src/app/domain/contest';
import { rejects } from 'assert';
import { Submission } from 'src/app/domain/submission';
import { ChangeDetectorRef } from '@angular/core';
import { ContestService } from '../services/contest.service';
import { Participant } from '../domain/participant';


@Component({
  selector: 'app-voting',
  standalone: true,
  imports: [NgIf, NgFor, ViewModelComponent],
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VotingComponent {
  route:ActivatedRoute=inject(ActivatedRoute)
  contestService:ContestService=inject(ContestService)
  cdr:ChangeDetectorRef=inject(ChangeDetectorRef)
  id:number
  contest:Contest
  participants:Participant[]=[]
  selectedModelId:number
  constructor() {
    this.id=Number(this.route.snapshot.params['id']);
  }
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    this.contestService.getContest(this.id).then((contest)=>{
      this.contest=contest
      this.cdr.markForCheck()
    }).catch(error=>{
      alert(error+' contest does not exist')
    })
    this.update()
  }

  viewModel(model_id){
    this.selectedModelId=model_id
    this.cdr.markForCheck()
  }

  update(){
    this.contestService.getParticipants(this.id).then(participants=>{
      while(this.participants.length!=0)
        this.participants.pop()
      participants.forEach(element => {
        this.participants.push(element)
      });
      this.cdr.markForCheck()
    })
  }

}
