import { Component, AfterViewInit } from '@angular/core';

import { AnnotatorService } from '../annotator.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'annotator-frame',
  templateUrl: './annotator-frame.component.html',
  styleUrls: ['./annotator-frame.component.scss']
})
export class AnnotatorFrameComponent implements AfterViewInit {

  public pages: any[] = [];

  constructor(
    private pdfReaderService: AnnotatorService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

  }

  public ngAfterViewInit(): void {
    this.route.params.subscribe((value: Params) => {
      const { id } = value;
      this.renderPDF(`/api/training/${id}`);
    });
  }

  private renderPDF(url: string): void {
    this.pdfReaderService.render(url)
      .then(pages =>  {
        this.pages = pages;
      });
  }

}
