import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { FileDropModule } from 'ngx-file-drop';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/shared/error404/error404.component';
import { HeaderComponent } from './components/header/header.component';
import { UploadMainComponent } from './components/upload-main/upload-main.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlertsService } from './components/alerts/alerts.service';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ModalComponent } from './components/modal/modal.component';
import { HistoryService } from './components/history/history.service';
import { HistoryComponent } from './components/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component,
    HeaderComponent,
    UploadMainComponent,
    FooterComponent,
    AlertsComponent,
    ModalComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    ToastrModule.forRoot(),
    FileDropModule,
    HttpClientModule,
    NgxSmartModalModule.forChild()

  ],
  providers: [AlertsService, HistoryService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
