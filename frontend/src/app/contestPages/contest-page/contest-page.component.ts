import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import {ContestService} from "../../services/contest.service";
import { ViewModelComponent } from 'src/app/model-display/model-display.component';
import {HttpClient} from "@angular/common/http";
import { CommonModule, NgFor, NgIf } from '@angular/common'; // import CommonModule
import { TemplateRef, ViewChild } from '@angular/core';
import { Contest, ContestStates } from 'src/app/domain/contest';
import { rejects } from 'assert';
import { Submission } from 'src/app/domain/submission';
import { ChangeDetectorRef } from '@angular/core';
import { SocketOne } from 'src/app/app.component';
import { EngineService } from 'src/app/model-display/model-display';

@Component({
  selector: 'app-contest-page',
  standalone: true,
  imports: [ViewModelComponent, NgFor, NgIf],
  templateUrl: './contest-page.component.html',
  styleUrls: ['./contest-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

// JUST FOR TESTSSSSSSS : 
export class ContestPageComponent {
  contestService:ContestService=inject(ContestService)
  route:ActivatedRoute=inject(ActivatedRoute)
  cdr:ChangeDetectorRef=inject(ChangeDetectorRef)
  socket=inject(SocketOne)
  engine=inject(EngineService)
  @ViewChild(ViewModelComponent) viewModelComponent: ViewModelComponent;

  id:number
  file: File | null = null;
  contest:Contest
  userSubmissions:Submission[]=[]
  nrs=[1,2,3]
  selectedModelId:number


  constructor(private activatedRoute: ActivatedRoute) {
    this.socket.on('refresh', (data:any)=>{
      alert("updating")
      this.update()
    })
    this.update()
  }

  selectSubmission(id:number){
    this.selectedModelId=id
    this.engine.reset()
    this.engine.load_submission(id)
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.params['id']);
    this.contestService.getContest(this.id).then((contest)=>{
      this.contest=contest
      this.cdr.markForCheck()
    }).catch(error=>{
      alert(error+' contest does not exist')
    })
    this.update()
  }

  update(){
    this.contestService.getSubmissions(this.id)
    .then((submissions:Submission[])=>{
      while(this.userSubmissions.length>0)
        this.userSubmissions.pop()
      submissions.forEach(submission=>{
        this.userSubmissions.push(submission)
      })
      this.cdr.markForCheck()
    }).catch(error=>{
    })
  }

  enroll(){
    this.contestService.enroll(this.id)
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      this.file = files[0];
    }
  }

  async onSubmit() {
    if (this.file) {
      const contestId = this.id; // replace with the actual contest ID
      this.contestService.submitSubmission(this.file, contestId).then(response=>{

      }).catch(reason=>{

      })
    }
  }
}