import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { PdfReaderService } from './pdf-reader.service';

@Component({
  selector: 'app-annotator',
  templateUrl: './annotator.component.html',
  styleUrls: ['./annotator.component.scss']
})
export class AnnotatorComponent implements AfterViewInit {

  constructor(
    private pdfReaderService: PdfReaderService,
    private element: ElementRef
  ) { }

  ngOnInit() {
    this.pdfReaderService.render('./assets/dummy-data/example.pdf');
  }

  public ngAfterViewInit(): void {
    const $container = this.element.nativeElement.querySelector('.pdf-canvas');
    console.log($container);
    console.log($container);
    this.pdfReaderService.render('./assets/dummy-data/example.pdf')
      .then(pages =>  {
        $container.innerHTML = '';
        pages.forEach($page => $container.appendChild($page));
      });
  }

}
