import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import * as PDFJS from 'pdfjs-dist';

const pdflib = PDFJS as any;

@Injectable({
  providedIn: 'root'
})
export class PdfReaderService {

  private pdf: any;

  private pages: HTMLElement[] = [];

  private scale: BehaviorSubject<number> = new BehaviorSubject<number>(2);

  constructor() {}

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
