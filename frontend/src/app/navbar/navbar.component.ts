import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  //encapsulation: ViewEncapsulation.None,
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  userType: string = 'user';

  constructor() { }

  ngOnInit(): void {
  }
}