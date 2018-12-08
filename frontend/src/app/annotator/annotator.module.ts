import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    AnnotatorRoutingModule
  ]
})
export class AnnotatorModule { }
