import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/shared/error404/error404.component';
import { AnnotatorComponent } from './components/annotator/annotator.component';
import { PageComponent } from './components/annotator/page/page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component,
    AnnotatorComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
