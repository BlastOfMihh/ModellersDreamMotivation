import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestPageComponent } from './contest-page.component';
import { ViewModelComponent } from 'src/app/model-display/model-display.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, ViewModelComponent, ContestPageComponent],
  exports: [ContestPageComponent]
})
export class ContestPageModule { 
}