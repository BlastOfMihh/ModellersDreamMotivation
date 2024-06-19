import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { EngineComponent } from './engine/engine.component';
import { UiComponent } from './ui/ui.component';
import { ViewModelComponent } from './viewmodel/engine.component';
import { NgFor } from '@angular/common';
import {HomePageComponent} from "./home-page/home-page.component";
import { RouterOutlet, provideRouter } from '@angular/router';
import { routes } from './routes';
import {ServerUrls} from "./urls";
import {Injectable} from "@angular/core";
import { Socket , SocketIoModule} from 'ngx-socket-io';
import { ContestService } from './services/contest.service';

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
    HomePageComponent,
    RouterOutlet
  ],
  selector: 'app-root',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:
  `
    <h1>
    this is it
    </h1>
    <router-outlet></router-outlet>
  `,
  providers: [SocketOne, ContestService]
})
export class AppComponent {
}
