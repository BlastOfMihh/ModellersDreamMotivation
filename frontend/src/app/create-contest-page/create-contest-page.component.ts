import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-contest-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-contest-page.component.html',
  styleUrl: './create-contest-page.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateContestPageComponent {
  contest = {
    name: '',
    host: '',
    state: '',
    description: '',
    task: {
      title: '',
      description: '',
    },
    participants: '',
    maximumParticipants: '',
    startTime: '',
    duration: '',
    submissions: '',
    maxRating: '',
  };

  onSubmit() {
    console.log(this.contest);
  }
}