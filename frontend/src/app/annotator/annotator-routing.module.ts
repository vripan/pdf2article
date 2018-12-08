import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnotatorComponent } from './annotator.component';

const routes: Routes = [
  {
    path: '',
    component: AnnotatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnotatorRoutingModule { }
