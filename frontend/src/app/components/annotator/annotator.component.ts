import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { PdfReaderService } from './pdf-reader.service';

@Component({
  selector: 'app-annotator',
  templateUrl: './annotator.component.html',
  styleUrls: ['./annotator.component.scss']
})
export class AnnotatorComponent implements AfterViewInit {

  public pages: any[] = [];

  constructor(
    private pdfReaderService: PdfReaderService,
    private element: ElementRef
  ) { }

  ngOnInit() {
    this.pdfReaderService.render('./assets/dummy-data/example.pdf');
  }

  public ngAfterViewInit(): void {
    this.renderPDF('./assets/dummy-data/example.pdf');
  }

  private renderPDF(url: string): void {
    const $container = this.element.nativeElement.querySelector('.pdf-canvas');

    this.pdfReaderService.render(url)
      .then(pages =>  {
        this.pages = pages;
      });
  }

}
