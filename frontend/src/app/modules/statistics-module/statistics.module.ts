import { StatisticsComponent } from './components';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [StatisticsComponent]
})
export class StatisticsModule { }
