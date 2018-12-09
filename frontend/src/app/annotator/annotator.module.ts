import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

import {AnnotatorComponent} from './annotator.component';
import {PageComponent} from './annotator-frame/page/page.component';
import {PdfCanvasComponent} from './annotator-frame/page/pdf-canvas/pdf-canvas.component';
import {AnnotatorCanvasComponent} from './annotator-frame/page/annotator-canvas/annotator-canvas.component';
import {AnnotatorRoutingModule} from './annotator-routing.module';
import {MatStepperModule} from '@angular/material/stepper';
import { AnnotatorStepperComponent } from './annotator-frame/annotator-stepper/annotator-stepper.component';
import {MatDividerModule} from '@angular/material/divider';
import { AnnotatorFrameComponent } from './annotator-frame/annotator-frame.component';

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
