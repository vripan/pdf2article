import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/shared/error404/error404.component';
import { HistoryComponent } from './components/history/history.component';
import { StatisticsComponent } from './modules/statistics-module/components';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'history',
    component: HistoryComponent
  }, {
    path: 'statistics',
    component: StatisticsComponent
  }, {
    path: 'annotator',
    loadChildren: './modules/annotator-module/annotator.module#AnnotatorModule'
  }, {
    path: '404',
    component: Error404Component
  }, {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
