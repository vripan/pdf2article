import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements AfterViewInit {

  @Input()
  private page: any;

  private scale: number = 2;

  constructor(
    private element: ElementRef
  ) { }

  public ngAfterViewInit(): void {
    const viewport = this.page.getViewport(this.scale),
          $canvas: HTMLCanvasElement = this.createPDFCanvas(viewport);

    this.page.render({
      canvasContext: $canvas.getContext('2d'),
      viewport
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
