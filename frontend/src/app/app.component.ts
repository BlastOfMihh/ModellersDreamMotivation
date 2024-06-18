import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { EngineComponent } from './engine/engine.component';
import { UiComponent } from './ui/ui.component';
import { ViewModelComponent } from './viewmodel/engine.component';
import { NgFor } from '@angular/common';
//import {HomePageComponent} from "./home-page/home-page.component";
import { RouterOutlet } from '@angular/router';
import { HomePageModule } from './home-page/home-page.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  imports: [
    ViewModelComponent,
    UiComponent,
    EngineComponent,
    FooterComponent,
    NavbarComponent,
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
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  providers:[]
})
export class AppComponent {
}
