import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { EngineComponent } from './engine/engine.component';
import { UiComponent } from './ui/ui.component';
import { ViewModelComponent } from './model-display/model-display.component';
import { RouterOutlet, provideRouter } from '@angular/router';
import {ServerUrls} from "./urls";
import {Injectable} from "@angular/core";
import { Socket , SocketIoModule} from 'ngx-socket-io';
import { ContestService } from './services/contest.service';

import { HomePageModule } from './home-page/home-page.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { ContestPageComponent } from './contestPages/contest-page/contest-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CreateContestPageComponent } from './create-contest-page/create-contest-page.component';

@Injectable()
export class SocketOne extends Socket {
  constructor() {
    super({ url: ServerUrls.base, options: {} });
  }
}

@Component({
  imports: [
    ViewModelComponent,
    UiComponent,
    EngineComponent,
    FooterComponent,
    NavbarComponent,
    NavbarAdminComponent,
    ContestPageComponent,
    ProfilePageComponent,
    CreateContestPageComponent,
    //HomePageComponent,
    HomePageModule,
    RouterOutlet,
    SocketIoModule
  ],
  selector: 'app-root',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // in template, if you want to use 
  // <app-navbar></app-navbar> for simple users
  // <app-navbar-admin></app-navbar-admin> for manager users
  
  template:
  `
    <app-navbar-admin></app-navbar-admin>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styleUrl:'app.component.scss',
  providers: [SocketOne, ContestService]
})
export class AppComponent {
}

