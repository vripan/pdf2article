import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import * as PDFJS from 'pdfjs-dist';

const pdflib = PDFJS as any;

export interface Annotation {
  x: number;
  y: number;
  width: number;
  height: number;
  page: number;
  label?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnnotatorService {

  private pdf: any;

  private pages: HTMLElement[] = [];

  private scale: number = 2;

  private annotations: Annotation[] = [];

  constructor() {}

  public setAnnotation(annotation: Annotation): void {
    this.annotations.push(Object.assign({}, annotation));
  }

  public getAnnotations(page: number) {
    return this.annotations.filter(annotation => annotation.page === page)
      .map(annotation => Object.assign({}, annotation));
  }

  public async render(documentUrl: string){
    try {
      this.pdf = await pdflib.getDocument(documentUrl);
      const { numPages } = this.pdf._pdfInfo;
      for (let i = 1; i <= numPages; i++) {
        const page = await this.pdf.getPage(i);
        this.pages.push(page);
      }

      return this.pages;
    } catch(error) {
      console.log(error);
    }
  }
}
