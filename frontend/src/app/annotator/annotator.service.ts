import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as PDFJS from 'pdfjs-dist';

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
  pairKey?: number;
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

  private articleID: number = 0;

  constructor(private http: HttpClient) {}

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
    this.annotations = [];
  }

  public getTrainingData() {
    return this.http.get('/api/training');
  }

  public saveMetadata(id) {
    const payload = this.annotations
      .filter(annotation => annotation.tag !== AnnotationType.Article);

    return this.http.post(`/api/training/metadata/${id}`, payload);
  }

  public getArticle(x: number, y: number, page: number) {
    return this.getAnnotationFromCoords(x, y, page)
      .filter(annotation => annotation.tag === AnnotationType.Article);
  }

  public getAnnotationFromCoords(x: number, y: number, page: number) {
    return this.annotations.filter(annotation =>
      x >= annotation.x && x <= annotation.xEnd &&
      y >= annotation.y && y <= annotation.yEnd &&
      page === annotation.page
    );
  }

  public getNextArticleID(): number {
    this.articleID++;
    return this.articleID;
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
