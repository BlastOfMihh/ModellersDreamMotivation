import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home-bar',
  standalone: true,
  imports: [],
  templateUrl: './home-bar.component.html',
  styleUrl: './home-bar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeBarComponent {

}
