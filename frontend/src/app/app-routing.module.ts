import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/shared/error404/error404.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

const routes: Routes = [
  { path: '' , component: HomeComponent },
  { path: 'statistics' , component: StatisticsComponent },
  { path: 'annotator', loadChildren: './annotator/annotator.module#AnnotatorModule' },
  { path: '404' , component: Error404Component },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
