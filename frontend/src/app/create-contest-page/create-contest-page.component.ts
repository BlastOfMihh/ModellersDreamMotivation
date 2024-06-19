import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-contest-page',
  standalone: true,
  imports: [
    FormsModule
  ],
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

  // Options for maximum participants
  participantOptions: number[] = [1, 2, 3, 4, 5];

  // Options for start time
  startTimeOptions: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'];

  // Options for duration in hours
  durationOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  onSubmit() {
    console.log(this.contest);
  }
}