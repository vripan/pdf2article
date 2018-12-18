import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { FileDropModule } from 'ngx-file-drop';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { MatListModule } from '@angular/material/list';

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
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ChartsModule } from 'ng2-charts';
import { MatSelectModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';

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
    HistoryComponent,
    StatisticsComponent,
    DoughnutChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    ToastrModule.forRoot(),
    FileDropModule,
    MatListModule,
    HttpClientModule,
    NgxSmartModalModule.forChild(),
    ChartsModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule

  ],
  providers: [AlertsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
