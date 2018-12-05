import { Component, AfterViewInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'annotator-canvas',
  templateUrl: './annotator-canvas.component.html',
  styleUrls: ['./annotator-canvas.component.scss']
})
export class AnnotatorCanvasComponent implements AfterViewInit {

  @Input()
  public viewport: any;

  constructor(
    private element: ElementRef
  ) { }

  public ngAfterViewInit(): void {
    const $canvas = this.createAnnotationCanvas(this.viewport);
    this.element.nativeElement.appendChild($canvas);
  }

  private createAnnotationCanvas(viewport): HTMLCanvasElement {
    const { width, height } = viewport,
          $canvas = document.createElement('canvas');

    $canvas.classList.add('page-canvas');
    $canvas.width = width;
    $canvas.height = height;

    return $canvas;
  }

}
