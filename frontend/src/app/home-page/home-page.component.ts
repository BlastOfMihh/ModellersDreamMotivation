import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { ContestService } from '../services/contest.service';
// import { ContestPageModule } from '../contestPages/contest-page/contest-page.module';

@Component({
  selector: 'app-home-page',
  standalone: true,
  // imports: [ContestPageModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
  // encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  currentContests = ['Current Contest 1', 'Current Contest 2', 'Current Contest 3'];
  archivedContests = ['Archived Contest 1', 'Archived Contest 2', 'Archived Contest 3'];
  
  contestService=inject(ContestService)
  constructor() { }

  ngOnInit(): void {
    // this.contestService.getContestPage(1, 1, 1000).then()
  }
}