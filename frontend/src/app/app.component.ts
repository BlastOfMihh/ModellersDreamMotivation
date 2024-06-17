import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { EngineComponent } from './engine/engine.component';
import { UiComponent } from './ui/ui.component';
import { ViewModelComponent } from './viewmodel/engine.component';
import { NgFor } from '@angular/common';
//import {HomePageComponent} from "./home-page/home-page.component";
import { RouterOutlet } from '@angular/router';
import { HomePageModule } from './home-page/home-page.module';

@Component({
  imports: [
    ViewModelComponent,
    UiComponent,
    EngineComponent,
    //HomePageComponent,
    HomePageModule,
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
    <h1>
    this is it
    </h1>
  `,
  providers:[]
})
export class AppComponent {
}
