import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatListModule,
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatStepperModule,
  MatDividerModule
} from '@angular/material';

import { AnnotatorComponent } from './annotator.component';
import { PageComponent } from './annotator-frame/page/page.component';
import { PdfCanvasComponent } from './annotator-frame/page/pdf-canvas/pdf-canvas.component';
import { AnnotatorCanvasComponent } from './annotator-frame/page/annotator-canvas/annotator-canvas.component';
import { AnnotatorStepperComponent } from './annotator-frame/annotator-stepper/annotator-stepper.component';
import { AnnotatorFrameComponent } from './annotator-frame/annotator-frame.component';
import { AnnotatorRoutingModule } from './annotator-routing.module';

@NgModule({
  declarations: [
    AnnotatorComponent,
    PageComponent,
    PdfCanvasComponent,
    AnnotatorCanvasComponent,
    AnnotatorStepperComponent,
    AnnotatorFrameComponent
  ],
  imports: [
    CommonModule,
    AnnotatorRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule,
    MatDividerModule,
    MatListModule
  ]
})
export class AnnotatorModule { }
