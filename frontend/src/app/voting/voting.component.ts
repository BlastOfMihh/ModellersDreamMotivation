import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-voting',
  standalone: true,
  imports: [],
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VotingComponent {

}
