import { Injectable } from '@angular/core';
import * as PDFJS from 'pdfjs-dist';

const pdflib = PDFJS as any;

@Injectable({
  providedIn: 'root'
})
export class PdfReaderService {

  private pdf: any;

  private pages: HTMLElement[] = [];

  private scale: number = 2;

  constructor() {}

  public async render(documentUrl: string){
    try {
      this.pdf = await pdflib.getDocument(documentUrl);
      const { numPages } = this.pdf._pdfInfo;
      for (let i = 1; i <= numPages; i++) {
        const $page: HTMLElement = await this.renderPage(i);
        this.pages.push($page);
      }

      return this.pages;
    } catch(error) {
      console.log(error);
    }
  }

  private renderPageCanvas(viewport): HTMLCanvasElement {
    const { width, height } = viewport,
          $canvas = document.createElement('canvas');

    $canvas.classList.add('page-canvas');
    $canvas.width = width;
    $canvas.height = height;

    return $canvas;
  }

  private renderPageWrapper(viewport, index: number, $canvas: HTMLCanvasElement): HTMLElement {
    const { width, height } = viewport,
          $page = document.createElement('div');

    $page.classList.add('page-wrapper');
    $page.dataset.page = "" + index;
    $page.appendChild($canvas);
    $page.style.width = `${width}px`;
    $page.style.height = `${height}px`;

    return $page;
  }

  private async renderPage(index: number): Promise<HTMLElement> {
    try {
      const page = await this.pdf.getPage(index),
            viewport = page.getViewport(this.scale),
            $canvas: HTMLCanvasElement = this.renderPageCanvas(viewport),
            $page: HTMLElement = this.renderPageWrapper(viewport, index, $canvas);

      page.render({
        canvasContext: $canvas.getContext('2d'),
        viewport
      });

      return $page;
    } catch (error) {
      console.error(error);
    }
  }

}
