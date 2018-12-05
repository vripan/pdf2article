import { Injectable } from '@angular/core';
import * as PDFJS from 'pdfjs-dist';
import { Subject } from 'rxjs';

const pdflib = PDFJS as any;

export enum AnnotationType {
  Article = 'article',
  Author = 'author',
  Title = 'title',
  Content = 'content'
}

export interface Annotation {
  x: number;
  y: number;
  xEnd: number;
  yEnd: number;
  page: number;
  tag?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnnotatorService {

  private pdf: any;

  private pages: HTMLElement[] = [];

  private annotations: Annotation[] = [];

  private annotationType: AnnotationType;

  constructor() {}

  public setAnnotation(annotation: Annotation): void {
    this.annotations.push(Object.assign({}, annotation));
  }

  public getAnnotations(page: number) {
    return this.annotations.filter(annotation => annotation.page === page)
      .map(annotation => Object.assign({}, annotation));
  }

  public setAnnotationType(type: AnnotationType): void {
    this.annotationType = type;
  }

  public getAnnotationType(): AnnotationType {
    return this.annotationType;
  }

  /**
   * Return the annotations to match the server response
   */
  public flushAnnotations() {

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
      return error;
    }
  }
}
