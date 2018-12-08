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

@NgModule({
  declarations: [
    AnnotatorComponent,
    PageComponent,
    PdfCanvasComponent,
    AnnotatorCanvasComponent
  ],
  imports: [
    CommonModule,
    AnnotatorRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule
  ]
})
export class AnnotatorModule { }
