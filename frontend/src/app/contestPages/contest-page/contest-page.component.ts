import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import {ContestService} from "../../services/contest.service";
import { ViewModelComponent } from 'src/app/model-display/model-display.component';
import {HttpClient} from "@angular/common/http";
import { CommonModule } from '@angular/common'; // import CommonModule
import { TemplateRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-contest-page',
  standalone: true,
  imports: [ViewModelComponent],
  templateUrl: './contest-page.component.html',
  styleUrls: ['./contest-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

// JUST FOR TESTSSSSSSS : 
export class ContestPageComponent {
  route:ActivatedRoute=inject(ActivatedRoute)
  id:number

  contestService:ContestService=inject(ContestService)
  file: File | null = null;

  constructor(private activatedRoute: ActivatedRoute) {
    this.id=Number(this.route.snapshot.params['id']);
  }

  @ViewChild('upcomingContest') upcomingContest: TemplateRef<any>;
  @ViewChild('runningContest') runningContest: TemplateRef<any>;
  @ViewChild('archivedContest') archivedContest: TemplateRef<any>;

  contest = {
    id: 1,
    name: 'Mock Contest',
    host: 'Mock Host',
    state: 'upcoming',
    description: 'This is a mock contest. It is for testing purposes. It is not real. Current contest is hosted by Laura and please follow her rules. Thank you! Also, this is a long description to test the overflow of the description. This is a mock contest. It is for testing purposes. It is not real. Current contest is hosted by Laura and please follow her rules. Thank you! Also, this is a long description to test the overflow of the description. This is a mock contest. It is for testing purposes. It is not real. Current contest is hosted by Laura and please follow her rules. Thank you! Also, this is a long description to test the overflow of the description.',
    startTime: '2021-01-01 00:02:00',
    duration: 60,
    task: {
      id: 1,
      title: 'Mock Task',
      description: 'This is a mock task.',
      constraints: '1 ≤ a, b ≤ 10^9',
      difficulty: 'Easy',
    },
    participants: 10,
    maximumParticipants: 15,
    submissions: 20,
    maxRating: 100,
  };

  getTemplate(contest) {
    switch (contest.state) {
      case 'upcoming':
        return this.upcomingContest;
      case 'running':
        return this.runningContest;
      case 'archived':
        return this.archivedContest;
      default:
        return null; // or return a default template
    }
  }


  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.params['id']);
    // Here you would normally fetch the contest data using the id
    // But since you're using mock data, you don't need to fetch anything
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



//

/// THE REAL ONE : 

// export class ContestPageComponent {
//   route:ActivatedRoute=inject(ActivatedRoute)
//   id:number
//   service:Service=inject(Service)

//   // JUST FOR TESTS
//   // Mock contest object
//   contest = {
//     id: 1,
//     title: 'Mock Contest',
//     description: 'This is a mock contest for testing purposes.',
//     startTime: '2021-01-01 00:00:00',
//     duration: 60,
//     task: {
//       id: 1,
//       title: 'Mock Task',
//       description: 'This is a mock task for testing purposes.',
//       input: '1 2\n3 4',
//       output: '3\n7',
//       constraints: '1 ≤ a, b ≤ 10^9',
//       sampleInput: '1 2\n3 4',
//       sampleOutput: '3\n7',
//       explanation: '3 = 1 + 2\n7 = 3 + 4',
//       difficulty: 'Easy',
//     },
//     participants: 10,
//     maximumParticipants: 15,
//     submissions: 20,
//     maxScore: 100,
//   };

//   // constructor(){
//   //   this.id=Number(this.route.snapshot.params['id']);
//   // }

//   //constructor(private route: ActivatedRoute, private contestService: Service) { }

//   constructor(private activatedRoute: ActivatedRoute, private contestService: Service) { }

//   ngOnInit(): void {
//     this.id = Number(this.activatedRoute.snapshot.params['id']);
//   }
// }
