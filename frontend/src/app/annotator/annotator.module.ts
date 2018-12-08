import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

import {AnnotatorComponent} from './annotator.component';
import {PageComponent} from './page/page.component';
import {PdfCanvasComponent} from './page/pdf-canvas/pdf-canvas.component';
import {AnnotatorCanvasComponent} from './page/annotator-canvas/annotator-canvas.component';
import {AnnotatorRoutingModule} from './annotator-routing.module';
import {MatStepperModule} from '@angular/material/stepper';
import { AnnotatorStepperComponent } from './annotator-stepper/annotator-stepper.component';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    AnnotatorComponent,
    PageComponent,
    PdfCanvasComponent,
    AnnotatorCanvasComponent,
    AnnotatorStepperComponent
  ],
  imports: [
    CommonModule,
    AnnotatorRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule,
    MatDividerModule
  ]
})
export class AnnotatorModule { }
