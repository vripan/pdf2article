import { Component, AfterViewInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'pdf-canvas',
  templateUrl: './pdf-canvas.component.html',
  styleUrls: ['./pdf-canvas.component.scss']
})
export class PdfCanvasComponent implements AfterViewInit {

  @Input()
  private page: any;

  @Input()
  private viewport: any;

  constructor(private element: ElementRef) { }

  public ngAfterViewInit(): void {
    const $canvas: HTMLCanvasElement = this.createPDFCanvas(this.viewport);

    this.page.render({
      canvasContext: $canvas.getContext('2d'),
      viewport: this.viewport
    });

    this.element.nativeElement.appendChild($canvas);
  }

  private createPDFCanvas(viewport): HTMLCanvasElement {
    const { width, height } = viewport,
          $canvas = document.createElement('canvas');

    $canvas.classList.add('page-canvas');
    $canvas.width = width;
    $canvas.height = height;

    return $canvas;
  }
}
