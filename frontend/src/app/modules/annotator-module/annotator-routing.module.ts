import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnotatorComponent } from './annotator.component';
import { AnnotatorFrameComponent } from './annotator-frame/annotator-frame.component';

const routes: Routes = [
  {
    path: '',
    component: AnnotatorComponent
  },
  {
    path: 'train/:id',
    component: AnnotatorFrameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnotatorRoutingModule { }
