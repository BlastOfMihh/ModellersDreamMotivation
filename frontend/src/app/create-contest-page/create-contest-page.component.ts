import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

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

  durationControl = new FormControl('', [
    Validators.required,
    this.numberValidator
  ]);

  numberValidator(control: FormControl) {
    const isNumber = !isNaN(control.value);
    return isNumber ? null : { number: true };
  }

  onSubmit() {
    console.log(this.contest);
  }
}