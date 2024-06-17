import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { EngineComponent } from './engine/engine.component';
import { UiComponent } from './ui/ui.component';
import { ViewModelComponent } from './viewmodel/engine.component';
import { NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";

@Component({
  imports: [
    ViewModelComponent,
    UiComponent,
    EngineComponent,
    RouterOutlet,
    HomePageComponent
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
    <app-view-model ></app-view-model>
    <h1>

    this is it
    </h1>
  `
})
export class AppComponent {
}
