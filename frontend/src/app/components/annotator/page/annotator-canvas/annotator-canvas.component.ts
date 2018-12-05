import { Component, AfterViewInit, ElementRef, Input, HostListener } from '@angular/core';

import { AnnotatorService, Annotation } from '../../annotator.service';

@Component({
  selector: 'annotator-canvas',
  templateUrl: './annotator-canvas.component.html',
  styleUrls: ['./annotator-canvas.component.scss']
})
export class AnnotatorCanvasComponent implements AfterViewInit {

  @Input()
  public viewport: any;

  @Input()
  public pageIndex: number;

  private ctx: CanvasRenderingContext2D;

  private draw: boolean = false;

  private currentAnnotation: Annotation;

  constructor(
    private element: ElementRef,
    private annotatorService: AnnotatorService
  ) {
    this.resetAnnotation();
  }

  public ngAfterViewInit(): void {
    const $canvas = this.createAnnotationCanvas(this.viewport);
    this.ctx = $canvas.getContext('2d');
    this.element.nativeElement.appendChild($canvas);
    this.drawAnnotations();
  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown($event) {
    this.currentAnnotation.x = $event.x;
    this.currentAnnotation.y = $event.y;
    this.draw = true;
  }

  @HostListener('mousemove', ['$event'])
  public onMouseMove($event) {
    if (!this.draw) return;

    const { x, y } = $event;
    this.currentAnnotation.width = x - this.currentAnnotation.x;
    this.currentAnnotation.height = y - this.currentAnnotation.y;
    this.drawAnnotations();
    this.drawAnnotation(this.currentAnnotation);
  }

  @HostListener('mouseup', ['$event'])
  public onMouseUp($event) {
    if (this.draw) {
      this.currentAnnotation.page = this.pageIndex;
      this.annotatorService.setAnnotation(this.currentAnnotation);
    }

    this.draw = false;
  }

  private resetAnnotation() {
    this.currentAnnotation = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      page: 0
    }
  }

  private createAnnotationCanvas(viewport): HTMLCanvasElement {
    const { width, height } = viewport,
          $canvas = document.createElement('canvas');

    $canvas.classList.add('page-canvas');
    $canvas.width = width;
    $canvas.height = height;

    return $canvas;
  }

  private drawAnnotation(annotation: Annotation): void {
    const { x, y, width, height } = annotation;
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawAnnotations() {
    this.ctx.clearRect(0, 0, this.viewport.width, this.viewport.height);
    const annotations: Annotation[] = this.annotatorService.getAnnotations(this.pageIndex);
    console.log(annotations);
    annotations.forEach(annotation => this.drawAnnotation(annotation));
  }

}
