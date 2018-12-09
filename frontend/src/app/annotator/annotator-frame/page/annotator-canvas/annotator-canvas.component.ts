import { Component, AfterViewInit, ElementRef, Input, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AnnotatorService, Annotation, AnnotationType, WorkMode } from '../../../annotator.service';

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

  private workMode: WorkMode;

  constructor(
    private element: ElementRef,
    private annotatorService: AnnotatorService,
    private toastr: ToastrService
  ) {
    this.resetAnnotation();
  }

  public ngAfterViewInit(): void {
    const $canvas = this.createAnnotationCanvas(this.viewport);
    this.ctx = $canvas.getContext('2d');
    this.element.nativeElement.appendChild($canvas);

    this.annotatorService.getWorkMode()
      .subscribe((mode: WorkMode) => {
        this.workMode = mode;
      })
    this.drawAnnotations();
  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown($event) {
    const { offsetX, offsetY } = $event;
    const tag = this.annotatorService.getAnnotationType();
    if (!tag) return;

    const articles = this.annotatorService.getArticle(offsetX, offsetY, this.pageIndex);
    if (tag !== AnnotationType.Article && articles.length === 0) {
      this.toastr.warning("You need to set up an article area first", "Annotation");
      return;
    }

    if (tag === AnnotationType.Article) {
      this.currentAnnotation.pairKey = this.annotatorService.getNextArticleID();
    } else {
      this.currentAnnotation.pairKey = articles[0].pairKey;
    }

    this.currentAnnotation.x = offsetX;
    this.currentAnnotation.y = offsetY;
    this.currentAnnotation.tag = tag;
    this.draw = true;
  }

  @HostListener('mousemove', ['$event'])
  public onMouseMove($event) {
    if (!this.draw) return;

    const { offsetX, offsetY } = $event;
    this.currentAnnotation.xEnd = offsetX - this.currentAnnotation.x;
    this.currentAnnotation.yEnd = offsetY - this.currentAnnotation.y;
    this.drawAnnotations();
    this.drawAnnotation(this.currentAnnotation);
  }

  @HostListener('mouseup', ['$event'])
  public onMouseUp($event) {
    if (this.draw && this.currentAnnotation.xEnd !== 0 && this.currentAnnotation.yEnd !== 0) {
      this.currentAnnotation.page = this.pageIndex;
      this.annotatorService.setAnnotation(this.currentAnnotation);
      this.resetAnnotation();
    }

    this.draw = false;
  }

  @HostListener('click', ['$event'])
  public onClick($event): void {
    const { offsetX, offsetY } = $event;
    if (this.workMode === WorkMode.Delete) {
      this.annotatorService.remove(offsetX, offsetY, this.pageIndex);
      this.drawAnnotations();
    }
  }

  private resetAnnotation() {
    this.currentAnnotation = {
      x: 0,
      y: 0,
      xEnd: 0,
      yEnd: 0,
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
    const { x, y, xEnd, yEnd } = annotation;
    this.ctx.beginPath();
    this.ctx.rect(x, y, xEnd, yEnd);

    switch(annotation.tag) {
      case AnnotationType.Article:
        this.ctx.strokeStyle = '#b71c1c';
        break;
      case AnnotationType.Title:
        this.ctx.strokeStyle = '#e65100';
        break;
      case AnnotationType.Author:
        this.ctx.strokeStyle = '#0d47a1';
        break;
      case AnnotationType.Content:
        this.ctx.strokeStyle = '#1b5e20';
        break;
    }

    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawAnnotations() {
    this.ctx.clearRect(0, 0, this.viewport.width, this.viewport.height);
    const annotations: Annotation[] = this.annotatorService.getAnnotations(this.pageIndex);
    annotations.forEach(annotation => this.drawAnnotation(annotation));
  }

}
