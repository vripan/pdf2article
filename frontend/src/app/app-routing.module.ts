import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnotatorComponent } from './components/annotator/annotator.component';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/shared/error404/error404.component';

const routes: Routes = [
  { path: '' , component: HomeComponent },
  { path: 'annotator', component: AnnotatorComponent },
  { path: '404' , component: Error404Component },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
