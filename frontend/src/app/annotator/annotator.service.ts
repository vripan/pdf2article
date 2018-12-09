import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as PDFJS from 'pdfjs-dist';
import { BehaviorSubject, Observable } from 'rxjs';

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

export enum WorkMode {
  Create = 'create',
  Delete = 'delete'
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

  private workMode: BehaviorSubject<WorkMode> = new BehaviorSubject<WorkMode>(WorkMode.Create);

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
    this.workMode.next(WorkMode.Create);
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
    return this.annotations.filter(annotation => this.hasAnnotation(x, y, page, annotation));
  }

  public remove(x: number, y: number, page) {
    const annotations = this.getAnnotationFromCoords(x, y, page);
    const article = annotations.find(annotation => annotation.tag === AnnotationType.Article);

    if (article) {
      this.removeArticle(article);
    } else {
      this.annotations = this.annotations.filter(annotation => !this.hasAnnotation(x, y, page, annotation));
    }
  }

  public getNextArticleID(): number {
    this.articleID++;
    return this.articleID;
  }

  public setWorkMode(mode: WorkMode): void {
    this.workMode.next(mode);
  }

  public getWorkMode(): Observable<WorkMode> {
    return this.workMode.asObservable();
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

  private hasAnnotation(x: number, y: number, page: number, annotation: Annotation): boolean {
    return (x >= annotation.x && x <= annotation.xEnd &&
    y >= annotation.y && y <= annotation.yEnd &&
    page === annotation.page);
  }

  private removeArticle(article) {
    this.annotations = this.annotations.filter(annotation => annotation.pairKey !== article.pairKey);
  }
}
