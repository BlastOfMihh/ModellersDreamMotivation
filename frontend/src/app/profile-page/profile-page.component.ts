import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent {
  submission1 = {
    id: 1,
    contestId: 1,
    status: 'accepted',
    time: '2021-01-01 00:02:00',
  };

  submission2 = {
    id: 2,
    contestId: 2,
    status: 'rejected',
    time: '2021-01-01 00:02:00',
  };

  submission3 = {
    id: 3,
    contestId: 3,
    status: 'pending',
    time: '2021-01-01 00:02:00',
  };

  user = {
    id: 1,
    username: 'mihhh',
    email: 'mihh',
    role: 'user', // 'admin', 'manager', 'user', ... tu stii aici
    rating: 100,
    contests: 10,
    createdContests: 0,
    submissions: 20,
    allSubmissions: [this.submission1, this.submission2, this.submission3],
    lastSubmission: {
      id: 1,
      contestId: 1,
      contestName: 'Mock Contest',
      contestRating: 100,
      status: 'accepted',
      time: '2021-01-01 00:02:00',
    },
    contestsWon: 5,
    contestsLost: 5,
    contestsTied: 0,
    contestsNotFinished: 0,
  }
}
