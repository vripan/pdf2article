import { Component, AfterViewInit, ElementRef, Input, HostListener } from '@angular/core';

interface Coords {
  x: number;
  y: number;
}

interface Rect {
  width: number;
  height: number;
}

interface Annotation {
  coords: Coords;
  rect: Rect;
}

@Component({
  selector: 'annotator-canvas',
  templateUrl: './annotator-canvas.component.html',
  styleUrls: ['./annotator-canvas.component.scss']
})
export class AnnotatorCanvasComponent implements AfterViewInit {

  @Input()
  public viewport: any;

  private ctx: CanvasRenderingContext2D;

  private draw: boolean = false;

  private annotations: Annotation[] = [];

  private currentAnnotation: Annotation;

  constructor(
    private element: ElementRef
  ) {
    this.currentAnnotation = {
      coords: {
        x: 0,
        y: 0
      },
      rect: {
        width: 0,
        height: 0
      }
    }
  }

  public ngAfterViewInit(): void {
    const $canvas = this.createAnnotationCanvas(this.viewport);
    this.ctx = $canvas.getContext('2d');
    this.element.nativeElement.appendChild($canvas);
  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown($event) {
    this.currentAnnotation.coords.x = $event.x;
    this.currentAnnotation.coords.y = $event.y;
    this.draw = true;
  }

  @HostListener('mousemove', ['$event'])
  public onMouseMove($event) {
    if (!this.draw) return;

    const { x, y } = $event;
    const { coords } = this.currentAnnotation;
    this.currentAnnotation.rect.width = x - coords.x;
    this.currentAnnotation.rect.height =  y - coords.y;

    this.drawAnnotation(this.currentAnnotation);
  }

  @HostListener('mouseup', ['$event'])
  public onMouseUp($event) {
    this.draw = false;
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
    const { x, y } = annotation.coords;
    const { width, height } = annotation.rect;

    this.ctx.clearRect(0, 0, this.viewport.width, this.viewport.height);
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.ctx.stroke();
  }

}
