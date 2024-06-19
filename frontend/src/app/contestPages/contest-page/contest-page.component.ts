import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import {ContestService} from "../../services/contest.service";

@Component({
  selector: 'app-contest-page',
  standalone: true,
  imports: [],
  templateUrl: './contest-page.component.html',
  styleUrl: './contest-page.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContestPageComponent {
  route:ActivatedRoute=inject(ActivatedRoute)
  id:number

  contestService:ContestService=inject(ContestService)
  file: File | null = null;

  constructor(){
    this.id=Number(this.route.snapshot.params['id']);
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
