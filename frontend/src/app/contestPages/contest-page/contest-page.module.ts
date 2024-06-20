import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ContestPageComponent } from './contest-page.component';
import { ViewModelComponent } from 'src/app/model-display/model-display.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, ViewModelComponent, ContestPageComponent, NgFor, NgIf],
  exports: [ContestPageComponent]
})
export class ContestPageModule { 
}