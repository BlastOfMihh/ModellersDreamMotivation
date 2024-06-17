import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  // standalone: true,
  // imports: [],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
  // encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  currentContests = ['Current Contest 1', 'Current Contest 2', 'Current Contest 3'];
  archivedContests = ['Archived Contest 1', 'Archived Contest 2', 'Archived Contest 3'];
  

  constructor() { }

  ngOnInit(): void {
  }
}