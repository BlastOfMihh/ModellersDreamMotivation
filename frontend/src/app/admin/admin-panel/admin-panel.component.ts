import { Component } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [UserListComponent],
  template: `
    <app-user-list>
  `,
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

}
