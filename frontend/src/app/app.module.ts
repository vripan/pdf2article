import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HomeComponent} from './components/home/home.component';
import {Error404Component} from './components/shared/error404/error404.component';
import {HeaderComponent} from './components/header/header.component';
import {UploadMainComponent} from './components/upload-main/upload-main.component';
import {FooterComponent} from './components/footer/footer.component';
import {AnnotatorComponent} from './components/annotator/annotator.component';
import {PageComponent} from './components/annotator/page/page.component';
import {PdfCanvasComponent} from './components/annotator/page/pdf-canvas/pdf-canvas.component';
import {AnnotatorCanvasComponent} from './components/annotator/page/annotator-canvas/annotator-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component,
    HeaderComponent,
    UploadMainComponent,
    FooterComponent,
    AnnotatorComponent,
    PageComponent,
    PdfCanvasComponent,
    AnnotatorCanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
